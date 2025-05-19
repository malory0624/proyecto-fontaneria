
CREATE TABLE Usuario (
    id_usuario VARCHAR(100),
    nombre VARCHAR(100),
    apellidos VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    contraseña VARCHAR(100),
    direccion TEXT,
    CONSTRAINT PK_id_usuario PRIMARY KEY (id_usuario)
);

CREATE TABLE Producto (
    id_producto VARCHAR(100),
    nombre VARCHAR(100),
    descripcion TEXT,
    precio DECIMAL(10, 2),
    stock INT,
    CONSTRAINT PK_id_producto PRIMARY KEY (id_producto)
);

CREATE TABLE Pedido (
    id_pedido VARCHAR(100),
    id_usuario VARCHAR(100),
    fecha DATE DEFAULT CURRENT_DATE,
    estado ENUM('pendiente', 'enviado', 'cancelado') NOT NULL,
    CONSTRAINT PK_id_pedido PRIMARY KEY (id_pedido),
    CONSTRAINT FK_pedido_usuario FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);


CREATE TABLE Servicio (
    id_servicio VARCHAR(100),
    id_pedido VARCHAR(100),
    id_producto VARCHAR(100),
    cantidad INT,
    CONSTRAINT PK_id_servicio PRIMARY KEY (id_servicio),
    CONSTRAINT FK_servicio_pedido FOREIGN KEY (id_pedido) REFERENCES Pedido(id_pedido),
    CONSTRAINT FK_servicio_producto FOREIGN KEY (id_producto) REFERENCES Producto(id_producto)
);

CREATE TABLE Fontanero (
    id_fontanero VARCHAR(100),
    nombre VARCHAR(100),
    especialidad VARCHAR(100),
    disponibilidad BOOLEAN DEFAULT TRUE,
    CONSTRAINT PK_id_fontanero PRIMARY KEY (id_fontanero)
);


CREATE TABLE Servicio_Fontanero (
    id_servicio VARCHAR(100),
    id_fontanero VARCHAR(100),
    CONSTRAINT PK_servicio_fontanero PRIMARY KEY (id_servicio, id_fontanero),
    CONSTRAINT FK_sf_servicio FOREIGN KEY (id_servicio) REFERENCES Servicio(id_servicio),
    CONSTRAINT FK_sf_fontanero FOREIGN KEY (id_fontanero) REFERENCES Fontanero(id_fontanero)
);
