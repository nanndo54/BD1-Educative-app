INSERT INTO departamento
SELECT DISTINCT null, nombre_dep FROM massive
WHERE nombre_dep!='';

INSERT INTO municipio
SELECT DISTINCT null, m.nombre_mun, d.id FROM massive m
INNER JOIN departamento d ON d.nombre=m.nombre_dep
WHERE nombre_mun!='';

INSERT INTO apertura
SELECT DISTINCT null, apertura FROM massive m
WHERE apertura!='';

INSERT INTO estatuto
SELECT DISTINCT null, estatuto_a FROM massive m
WHERE estatuto_a!='';

INSERT INTO horario
SELECT DISTINCT null, horarios FROM massive m
WHERE horarios!='';

INSERT INTO lengua
SELECT DISTINCT null, lengua FROM massive m
WHERE lengua!='';

INSERT INTO estado
SELECT DISTINCT null, estado FROM massive m
WHERE estado!='';

INSERT INTO rol
SELECT DISTINCT null, role FROM massive m
WHERE role!='';

INSERT INTO ubicacion
SELECT DISTINCT null, ubicuacion FROM massive m
WHERE ubicuacion!='';

INSERT INTO genero
SELECT DISTINCT null, genero FROM massive m
WHERE genero!='';

INSERT INTO nivel
SELECT DISTINCT null, nivel FROM massive m
WHERE nivel!='';

INSERT INTO establecimiento
SELECT DISTINCT null, m.nombre, m.direccion, m.latlones_2, mu.id, n.id, g.id, h.id, e.id, u.id, r.id, es.id, l.id, a.id FROM massive m
INNER JOIN municipio mu ON mu.nombre=m.nombre_mun
INNER JOIN nivel n ON n.nombre=m.nivel
INNER JOIN genero g ON g.nombre=m.genero
INNER JOIN horario h ON h.nombre=m.horarios
INNER JOIN estatuto e ON e.nombre=m.estatuto_a
INNER JOIN ubicacion u ON u.nombre=m.ubicuacion
INNER JOIN rol r ON r.nombre=m.role
INNER JOIN estado es ON es.nombre=m.estado
INNER JOIN lengua l ON l.nombre=m.lengua
INNER JOIN apertura a ON a.nombre=m.apertura
WHERE m.nombre!='' AND m.direccion!='';
