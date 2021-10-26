CREATE TABLE departamento(
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100),
  PRIMARY KEY(id)
);
CREATE TABLE municipio(
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100),
  id_departamento INT,
  PRIMARY KEY(id),
  FOREIGN KEY(id_departamento) REFERENCES departamento(id)
);
CREATE TABLE apertura(
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100),
  PRIMARY KEY(id)
);
CREATE TABLE estatuto(
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100),
  PRIMARY KEY(id)
);
CREATE TABLE horario(
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100),
  PRIMARY KEY(id)
);
CREATE TABLE lengua(
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100),
  PRIMARY KEY(id)
);
CREATE TABLE estado(
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100),
  PRIMARY KEY(id)
);
CREATE TABLE rol(
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100),
  PRIMARY KEY(id)
);
CREATE TABLE ubicacion(
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100),
  PRIMARY KEY(id)
);
CREATE TABLE genero(
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100),
  PRIMARY KEY(id)
);
CREATE TABLE nivel(
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100),
  PRIMARY KEY(id)
);
CREATE TABLE establecimiento(
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100),
  direccion VARCHAR(100),
  estudiantes VARCHAR(100),
  id_municipio INT,
  id_nivel INT,
  id_genero INT,
  id_horario INT,
  id_estatuto INT,
  id_ubicacion INT,
  id_rol INT,
  id_estado INT,
  id_lengua INT,
  id_apertura INT,
  PRIMARY KEY(id),
  FOREIGN KEY(id_municipio) REFERENCES municipio(id),
  FOREIGN KEY(id_nivel) REFERENCES nivel(id),
  FOREIGN KEY(id_genero) REFERENCES genero(id),
  FOREIGN KEY(id_horario) REFERENCES horario(id),
  FOREIGN KEY(id_estatuto) REFERENCES estatuto(id),
  FOREIGN KEY(id_ubicacion) REFERENCES ubicacion(id),
  FOREIGN KEY(id_rol) REFERENCES rol(id),
  FOREIGN KEY(id_estado) REFERENCES estado(id),
  FOREIGN KEY(id_lengua) REFERENCES lengua(id),
  FOREIGN KEY(id_apertura) REFERENCES apertura(id)
);
