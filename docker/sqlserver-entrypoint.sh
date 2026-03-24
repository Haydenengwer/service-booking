#!/bin/bash
set -e

# Start SQL Server in the background
/opt/mssql/bin/sqlservr &
MSSQL_PID=$!

# Wait for SQL Server to be ready, then create the database
echo "Waiting for SQL Server to start..."
for i in {1..60}; do
    if /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -C -Q "SELECT 1" &>/dev/null 2>&1; then
        SQLCMD="/opt/mssql-tools18/bin/sqlcmd -C"
        break
    elif /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -Q "SELECT 1" &>/dev/null 2>&1; then
        SQLCMD="/opt/mssql-tools/bin/sqlcmd"
        break
    fi
    echo "Attempt $i/60 - waiting..."
    sleep 2
done

if [ -z "$SQLCMD" ]; then
    echo "ERROR: SQL Server did not become ready in time."
    exit 1
fi

echo "SQL Server is ready. Creating database if needed..."
$SQLCMD -S localhost -U sa -P "$SA_PASSWORD" -Q \
    "IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'ServiceBookingDB') CREATE DATABASE ServiceBookingDB"

echo "Database ready."
wait $MSSQL_PID
