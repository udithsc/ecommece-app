#!/bin/bash

# UDT Store Production Docker Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker first."
        exit 1
    fi
}

# Validate production environment
validate_prod_env() {
    if [ ! -f .env.docker ]; then
        print_error ".env.docker file not found. Please create it first."
        exit 1
    fi
    
    # Check required environment variables
    source .env.docker
    
    required_vars=("POSTGRES_PASSWORD" "NEXTAUTH_SECRET" "STRIPE_SECRET_KEY")
    for var in "${required_vars[@]}"; do
        if [ -z "${!var}" ]; then
            print_error "Required environment variable $var is not set"
            exit 1
        fi
    done
}

# Deploy production environment
deploy_prod() {
    print_info "Deploying UDT Store production environment..."
    
    check_docker
    validate_prod_env
    
    # Create necessary directories
    mkdir -p uploads logs backups
    
    # Build and start services
    docker-compose -f docker-compose.prod.yml --env-file .env.docker up --build -d
    
    # Wait for services to be healthy
    print_info "Waiting for services to be ready..."
    docker-compose -f docker-compose.prod.yml --env-file .env.docker exec web curl -f http://localhost:3000/api/health || true
    
    print_success "Production environment deployed successfully!"
    print_info "Services available at:"
    echo "  - Web Application: http://localhost:3000"
    echo "  - Database: localhost:5432"
    echo "  - Redis: localhost:6379"
}

# Stop production environment
stop_prod() {
    print_info "Stopping UDT Store production environment..."
    docker-compose -f docker-compose.prod.yml down
    print_success "Production environment stopped!"
}

# Update production environment
update_prod() {
    print_info "Updating UDT Store production environment..."
    
    # Pull latest code (assuming this is run in CI/CD)
    # git pull origin main
    
    # Rebuild and restart services
    docker-compose -f docker-compose.prod.yml --env-file .env.docker up --build -d
    
    print_success "Production environment updated!"
}

# Show production logs
show_logs() {
    service=${1:-}
    if [ -z "$service" ]; then
        docker-compose -f docker-compose.prod.yml logs -f --tail=100
    else
        docker-compose -f docker-compose.prod.yml logs -f --tail=100 "$service"
    fi
}

# Backup production database
backup_db() {
    timestamp=$(date +%Y%m%d_%H%M%S)
    backup_file="backups/udt_store_backup_${timestamp}.sql"
    
    print_info "Creating production database backup..."
    
    # Create backup directory if it doesn't exist
    mkdir -p backups
    
    # Create backup
    docker-compose -f docker-compose.prod.yml exec postgres pg_dump -U postgres "udt-store-db" > "$backup_file"
    
    # Compress backup
    gzip "$backup_file"
    
    print_success "Database backup created: ${backup_file}.gz"
    
    # Keep only last 7 backups
    find backups/ -name "udt_store_backup_*.sql.gz" -type f -mtime +7 -delete
}

# Restore production database
restore_db() {
    backup_file=$1
    if [ -z "$backup_file" ]; then
        print_error "Please provide backup file path"
        exit 1
    fi
    
    if [ ! -f "$backup_file" ]; then
        print_error "Backup file not found: $backup_file"
        exit 1
    fi
    
    print_warning "This will overwrite the current production database!"
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_info "Restoring database from $backup_file..."
        
        # Stop web service to prevent connections
        docker-compose -f docker-compose.prod.yml stop web
        
        # Restore database
        if [[ "$backup_file" == *.gz ]]; then
            gunzip -c "$backup_file" | docker-compose -f docker-compose.prod.yml exec -T postgres psql -U postgres "udt-store-db"
        else
            docker-compose -f docker-compose.prod.yml exec -T postgres psql -U postgres "udt-store-db" < "$backup_file"
        fi
        
        # Start web service
        docker-compose -f docker-compose.prod.yml start web
        
        print_success "Database restored successfully!"
    else
        print_info "Database restore cancelled."
    fi
}

# Health check
health_check() {
    print_info "Checking production environment health..."
    
    # Check if services are running
    docker-compose -f docker-compose.prod.yml ps
    
    # Check application health
    if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
        print_success "Web application is healthy"
    else
        print_error "Web application is not responding"
    fi
    
    # Check database health
    if docker-compose -f docker-compose.prod.yml exec postgres pg_isready -U postgres > /dev/null 2>&1; then
        print_success "Database is healthy"
    else
        print_error "Database is not responding"
    fi
    
    # Check Redis health
    if docker-compose -f docker-compose.prod.yml exec redis redis-cli ping > /dev/null 2>&1; then
        print_success "Redis is healthy"
    else
        print_error "Redis is not responding"
    fi
}

# Show resource usage
show_stats() {
    print_info "Production environment resource usage:"
    docker stats $(docker-compose -f docker-compose.prod.yml ps -q) --no-stream
}

# Show help
show_help() {
    echo "UDT Store Production Docker Script"
    echo ""
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  deploy    Deploy production environment"
    echo "  stop      Stop production environment"
    echo "  update    Update production environment"
    echo "  logs      Show logs (optional: specify service name)"
    echo "  backup    Create database backup"
    echo "  restore   Restore database (requires backup file path)"
    echo "  health    Check environment health"
    echo "  stats     Show resource usage statistics"
    echo "  help      Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 deploy                           # Deploy production environment"
    echo "  $0 logs web                        # Show logs for web service"
    echo "  $0 restore backups/backup.sql.gz   # Restore database from backup"
}

# Main script logic
case "${1:-help}" in
    deploy)
        deploy_prod
        ;;
    stop)
        stop_prod
        ;;
    update)
        update_prod
        ;;
    logs)
        show_logs "$2"
        ;;
    backup)
        backup_db
        ;;
    restore)
        restore_db "$2"
        ;;
    health)
        health_check
        ;;
    stats)
        show_stats
        ;;
    help|*)
        show_help
        ;;
esac