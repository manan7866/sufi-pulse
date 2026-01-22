@echo off
echo Importing database dump file into the running PostgreSQL container...

docker exec -i sufi_pulse_db_dev pg_restore --username=sufi_pulse_user --dbname=sufi_pulse_db --clean --no-owner --no-privileges /docker-entrypoint-initdb.d/2-data.dump

echo Database dump imported successfully!