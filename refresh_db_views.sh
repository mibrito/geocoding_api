echo "refresh view municipio_mg"
docker-compose exec postgres sh -c "psql -U postgres -d gazetteer --command 'refresh materialized view geodata.municipio_mg;'"

echo "refresh bairro_bh"
docker-compose exec postgres sh -c "psql -U postgres -d gazetteer --command 'refresh materialized view geodata.bairro_bh;'"

echo "refresh logradouro_mg"
docker-compose exec postgres sh -c "psql -U postgres -d gazetteer --command 'refresh materialized view geodata.logradouro_mg;'"

