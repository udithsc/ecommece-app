#!/bin/bash

# UDT Store Development Docker Script

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

# Create environment file if it doesn't exist
setup_env() {
    if [ ! -f .env.docker ]; then
        print_warning ".env.docker not found. Creating from example..."
        cp .env.docker.example .env.docker
        print_warning "Please update .env.docker with your actual configuration"
    fi
}

# Build and start development environment
start_dev() {
    print_info "Starting UDT Store development environment..."
    
    check_docker
    setup_env
    
    # Build and start services
    docker-compose -f docker-compose.dev.yml --env-file .env.docker up --build -d
    
    print_success "Development environment started successfully!"
    print_info "Services available at:"
    echo "  - Web Application: http://localhost:3000"
    echo "  - Database Admin: http://localhost:8080"
    echo "  - Email Testing: http://localhost:8025"
    echo "  - Redis: localhost:6379"
    echo "  - PostgreSQL: localhost:5432"
}

# Stop development environment
stop_dev() {
    print_info "Stopping UDT Store development environment..."
    docker-compose -f docker-compose.dev.yml down
    print_success "Development environment stopped!"
}

# Restart development environment
restart_dev() {
    print_info "Restarting UDT Store development environment..."
    stop_dev
    start_dev
}

# Show logs
show_logs() {
    service=${1:-}
    if [ -z "$service" ]; then
        docker-compose -f docker-compose.dev.yml logs -f
    else
        docker-compose -f docker-compose.dev.yml logs -f "$service"
    fi
}

# Clean up development environment
clean_dev() {
    print_warning "This will remove all containers, volumes, and images for development environment"
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_info "Cleaning up development environment..."
        docker-compose -f docker-compose.dev.yml down -v --rmi all
        print_success "Development environment cleaned up!"
    else
        print_info "Cleanup cancelled."
    fi
}

# Database operations
db_backup() {
    print_info "Creating database backup..."
    docker-compose -f docker-compose.dev.yml exec postgres pg_dump -U postgres "udt-store-db" > "backup_dev_$(date +%Y%m%d_%H%M%S).sql"
    print_success "Database backup created!"
}

db_restore() {
    backup_file=$1
    if [ -z "$backup_file" ]; then
        print_error "Please provide backup file path"
        exit 1
    fi
    
    print_info "Restoring database from $backup_file..."
    docker-compose -f docker-compose.dev.yml exec -T postgres psql -U postgres "udt-store-db" < "$backup_file"
    print_success "Database restored!"
}

# Show help
show_help() {
    echo "UDT Store Development Docker Script"
    echo ""
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  start     Start development environment"
    echo "  stop      Stop development environment"
    echo "  restart   Restart development environment"
    echo "  logs      Show logs (optional: specify service name)"
    echo "  clean     Clean up development environment"
    echo "  backup    Create database backup"
    echo "  restore   Restore database (requires backup file path)"
    echo "  help      Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 start                    # Start development environment"
    echo "  $0 logs web-dev            # Show logs for web service"
    echo "  $0 restore backup.sql      # Restore database from backup"
}

# Main script logic
case "${1:-help}" in
    start)
        start_dev
        ;;
    stop)
        stop_dev
        ;;
    restart)
        restart_dev
        ;;
    logs)
        show_logs "$2"
        ;;
    clean)
        clean_dev
        ;;
    backup)
        db_backup
        ;;
    restore)
        db_restore "$2"
        ;;
    help|*)
        show_help
        ;;
esac