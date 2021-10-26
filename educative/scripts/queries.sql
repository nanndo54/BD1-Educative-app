-- 1. Desplegar el porcentaje de establecimientos por cada nivel educativo
SELECT;
-- 2. Desplegar los establecimientos en el sur del país
SELECT
  DISTINCT e.nombre establecimiento
FROM
  establecimiento e
  INNER JOIN municipio m ON m.id = e.id_municipio
  INNER JOIN departamento d ON d.id = m.id_departamento
WHERE
  d.nombre IN (
    'JUTIAPA',
    'JALAPA',
    'SANTA ROSA',
    'SAN MARCOS',
    'QUETZALTENANGO',
    'TOTONICAPAN',
    'SOLOLA',
    'RETALHULEU'
  );
-- 3. Desplegar un Top 10 de Municipios con menos establecimientos
SELECT
  m.nombre municipio,
  count(*) establecimientos
FROM
  municipio m
  INNER JOIN establecimiento e ON e.id_municipio = m.id
GROUP BY
  municipio
ORDER BY
  establecimientos
LIMIT
  10;
-- 4. Desplegar los establecimientos con “BARRIOS” en su nombre que no estén en la capital
SELECT
  e.nombre establecimiento,
  m.nombre municipio
FROM
  establecimiento e
  INNER JOIN municipio m ON m.id = e.id_municipio
WHERE
  e.nombre LIKE '%BARRIOS%'
  AND m.nombre != 'GUATEMALA';
-- 5. Desplegar el total de establecimientos en los municipios agrupados por su letra inicial, es decir, agrupar los municipios con A luego calcular el número de establecimientos, lo mismo para los que inicien con B y así sucesivamente
SELECT
  substr(m.nombre, 1, 1) letra,
  count(e.id) establecimientos
FROM
  municipio m
  INNER JOIN establecimiento e ON e.id_municipio = m.id
GROUP BY
  letra;
-- 6. Desplegar los municipios con su departamento los cuales contengan al menos un establecimiento urbano
SELECT
  m.nombre municipio,
  count(e.id) `establecimientos urbanos`
FROM
  establecimiento e
  INNER JOIN municipio m ON m.id = e.id_municipio
  INNER JOIN departamento d ON d.id = m.id_departamento
WHERE
  e.id_ubicacion =(
    SELECT
      id
    FROM
      ubicacion
    WHERE
      nombre = 'URBANO'
  )
GROUP BY
  municipio
HAVING
  `establecimientos urbanos` >= 1;
SELECT
  *
FROM
  ubicacion;
-- 7. Mostrar los departamentos en donde haya más establecimientos para mujeres que para hombres
SELECT
  2 + 2;
-- 8. Desplegar el porcentaje de establecimientos rurales y urbanas de los departamentos en donde haya más establecimientos rurales
SELECT
  2 + 2;
-- 9. Mostrar el porcentaje de establecimientos por Jornada
SELECT
  2 + 2;
-- 10. Desplegar los establecimientos que tengan más estudiantes que el promedio
SELECT
  2 + 2;
-- 11. Desplegar la cantidad estudiantes que hay por región (Norte, Nor-Occidente, NorOriente, Sur-Occidente, Sur-Oriente, Central, Metropolitana, Petén)
SELECT
  2 + 2;
-- 12. Desplegar los 2 establecimientos con más estudiantes de cada departamento
SELECT
  2 + 2;
