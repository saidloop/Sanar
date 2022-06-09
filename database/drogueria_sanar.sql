-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-06-2022 a las 06:27:22
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `drogueria_sanar`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `drogueria`
--

CREATE TABLE `drogueria` (
  `id` int(11) NOT NULL,
  `nombre` varchar(16) COLLATE utf8_spanish_ci NOT NULL,
  `direccion` varchar(16) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `drogueria`
--

INSERT INTO `drogueria` (`id`, `nombre`, `direccion`) VALUES
(1, 'SanarLaLibertad', 'av 1 calle 2 #19'),
(2, 'SanarGuaimaral', 'av 4 calle 2 #19'),
(3, 'SanarLosPatios', 'av 34 calle 2 #2'),
(4, 'SanarLaSabana', 'av 43 calle 7 #9'),
(5, 'SanarNavarro', 'av 3 calle 9 #64');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `nombre` varchar(16) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` text COLLATE utf8_spanish_ci NOT NULL,
  `precio` int(11) NOT NULL,
  `drogueria_id` int(11) NOT NULL,
  `unidades` int(11) NOT NULL,
  `drogueria_nombre` varchar(16) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `nombre`, `descripcion`, `precio`, `drogueria_id`, `unidades`, `drogueria_nombre`) VALUES
(23355, 'sopad', 'siadd', 7000, 1, 4, ''),
(23358, 'sopa de pollo', 'con pollo', 7000, 1, 4, ''),
(23490, 'ajasd', 'sdd', 2550, 1, 1, ''),
(29633, 'aopopo', 'sdd', 2550, 1, 1, ''),
(67888, 'susan', 'sdsss', 23900, 1, 2, ''),
(99875, 'maizd', 'sias', 20000, 1, 1, ''),
(99991, 'mamas', 'sias', 20000, 1, 1, ''),
(233412, 'sopa', 'siadd', 7000, 1, 4, ''),
(233588, 'sopadi', 'siadd', 7000, 1, 4, ''),
(388663, 'arroz', 'si', 4000, 1, 24, ''),
(999912, 'mamascs', 'sias', 20000, 1, 1, ''),
(3445556, 'ffff', 'dfsf', 44555, 1, 4, ''),
(9987565, 'maizdg', 'sias', 20000, 1, 1, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('-DvFNJwv2DeE5216wdCv2aNwKywqh5Yf', 1654834897, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}'),
('CNt6X4wgki8koxOFJobSuAaGERCY7Mz4', 1654552898, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(16) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(16) COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(150) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`) VALUES
(3, 'Andres', 'andres@gmail.com', '$2a$10$IFLVIkuYa2LiE4NJYBiVtu8BouR4Q6aTlH6pF7aZra8fNBeazn/i2');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `drogueria`
--
ALTER TABLE `drogueria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_drogueria_id` (`drogueria_id`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `drogueria`
--
ALTER TABLE `drogueria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9987566;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `fk_drogueria_id` FOREIGN KEY (`drogueria_id`) REFERENCES `drogueria` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
