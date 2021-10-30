-- 1. Desplegar el porcentaje de establecimientos por cada nivel educativo
SELECT
  n.nombre `nivel educativo`,
  count(e.id) /(
    SELECT
      count(e.id) total
    FROM
      establecimiento e
  ) * 100 `porcentaje establecimientos`
FROM
  establecimiento e
  INNER JOIN nivel n ON n.id = e.id_nivel
GROUP BY
  `nivel educativo`;
-- 2. Desplegar los establecimientos en el sur del país
SELECT
  e.nombre establecimiento
FROM
  establecimiento e
  INNER JOIN municipio m ON m.id = e.id_municipio
  INNER JOIN departamento d ON d.id = m.id_departamento
WHERE
  d.id_region IN (
    SELECT
      id
    FROM
      region
    WHERE
      nombre IN ('SUROCCIDENTE', 'SURORIENTE')
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
-- 7. Mostrar los departamentos en donde haya más establecimientos para mujeres que para hombres
SELECT
  d.nombre departamento,
  s1.cantidad mujeres,
  s2.cantidad hombres
FROM
  departamento d
  INNER JOIN (
    SELECT
      d.id id,
      count(e.id) cantidad
    FROM
      departamento d
      INNER JOIN municipio m ON m.id_departamento = d.id
      INNER JOIN establecimiento e ON e.id_municipio = m.id
    WHERE
      e.id_genero =(
        SELECT
          id
        FROM
          genero
        WHERE
          nombre = 'MUJERES'
      )
    GROUP BY
      id
  ) s1 ON s1.id = d.id
  INNER JOIN (
    SELECT
      d.id id,
      count(e.id) cantidad
    FROM
      departamento d
      INNER JOIN municipio m ON m.id_departamento = d.id
      INNER JOIN establecimiento e ON e.id_municipio = m.id
    WHERE
      e.id_genero =(
        SELECT
          id
        FROM
          genero
        WHERE
          nombre = 'HOMBRES'
      )
    GROUP BY
      id
  ) s2 ON s2.id = d.id
WHERE
  s1.cantidad > s2.cantidad;
-- 8. Desplegar el porcentaje de establecimientos rurales y urbanas de los departamentos en donde haya más establecimientos rurales
SELECT
  d.nombre departamento,
  s1.cantidad `e. rurales`,
  s2.cantidad `e. urbanos`,
  (s1.cantidad / (s1.cantidad + s2.cantidad)) * 100 `p. e. rurales`,
  (s2.cantidad / (s1.cantidad + s2.cantidad)) * 100 `p. e. urbanos`
FROM
  departamento d
  INNER JOIN (
    SELECT
      d.id id,
      count(e.id) cantidad
    FROM
      departamento d
      INNER JOIN municipio m ON m.id_departamento = d.id
      INNER JOIN establecimiento e ON e.id_municipio = m.id
    WHERE
      e.id_ubicacion =(
        SELECT
          id
        FROM
          ubicacion
        WHERE
          nombre = 'RURAL'
      )
    GROUP BY
      id
  ) s1 ON s1.id = d.id
  INNER JOIN (
    SELECT
      d.id id,
      count(e.id) cantidad
    FROM
      departamento d
      INNER JOIN municipio m ON m.id_departamento = d.id
      INNER JOIN establecimiento e ON e.id_municipio = m.id
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
      id
  ) s2 ON s2.id = d.id;
-- 9. Mostrar el porcentaje de establecimientos por Jornada
SELECT
  h.nombre jornada,
  count(e.id) /(
    SELECT
      count(e.id) total
    FROM
      establecimiento e
  ) * 100 `porcentaje establecimientos`
FROM
  establecimiento e
  INNER JOIN horario h ON h.id = e.id_horario
GROUP BY
  jornada;
-- 10. Desplegar los establecimientos que tengan más estudiantes que el promedio
SELECT
  nombre,
  estudiantes
FROM
  establecimiento
HAVING
  estudiantes > (
    SELECT
      AVG(estudiantes)
    FROM
      establecimiento
  )
ORDER BY
  estudiantes;
-- 11. Desplegar la cantidad estudiantes que hay por región (Norte, Nor-Occidente, NorOriente, Sur-Occidente, Sur-Oriente, Central, Metropolitana, Petén)
SELECT
  r.nombre region,
  sum(e.id) estudiantes
FROM
  region r
  INNER JOIN departamento d ON d.id_region = r.id
  INNER JOIN municipio m ON m.id_departamento = d.id
  INNER JOIN establecimiento e ON e.id_municipio = m.id
GROUP BY
  region;
-- 12. Desplegar los 2 establecimientos con más estudiantes de cada departamento
SELECT
  d.nombre departamento,
  e.nombre establecimiento,
  e.estudiantes estudiantes
FROM
  departamento d
  INNER JOIN municipio m ON m.id_departamento = d.id
  INNER JOIN establecimiento e ON e.id_municipio = m.id
GROUP BY
  departamento
ORDER BY
  estudiantes DESC;
select
  *
from
  establecimiento;
