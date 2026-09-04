---
title: "Capitalización de Bancos"
description: "Extracción web de los bancos más grandes del mundo y proceso ETL para su análisis con SQL y Python."
pubDate: 2024-03-22
category: "Notebooks Analytics"
tags: ["Python", "Web Scraping", "ETL", "SQLite", "Pandas", "BeautifulSoup"]
github: "https://github.com/HoracioLaphitz/Capitalizacion-del-Mercado-de-los-Bancos-mas-Grandes"
showcase:
  context: "La capitalización de mercado de los bancos más grandes vive en una tabla de Wikipedia: sin API, sin CSV descargable."
  contribution: "Extracción web con BeautifulSoup y proceso ETL completo —extracción, transformación y carga en SQLite y CSV— con registro de eventos."
  result: "Datos disponibles para consultas SQL y un proceso auditable mediante el registro de cada etapa."
  evidenceAction: "Ver notebook y código en GitHub"
draft: false
featured: true
resources:
  notebooks:
    - name: "Capitalización de Bancos — ETL"
      path: "/Proyectos/Notebooks/Banks_Project.ipynb"
---

## El problema

La capitalización de mercado de los bancos más grandes del mundo se publica en una tabla de Wikipedia, sin API ni archivo CSV descargable. El proyecto de la carrera de **Data Engineering de IBM** consistió en construir el proceso completo para capturar esos datos y permitir su consulta.

## Resolución

Un proceso **ETL** completo:

- **Extracción** — scraping de la tabla con `requests` + **BeautifulSoup**, parseando el HTML a un DataFrame de Pandas.
- **Transformación** — limpieza de los montos y conversión de la capitalización a múltiples monedas usando tasas de cambio desde un CSV.
- **Carga** — persistencia doble: base **SQLite** consultable por SQL y archivo CSV.
- **Registro de eventos** — función propia que registra cada etapa del proceso con fecha y hora para auditar su ejecución.

## Tecnologías

Python · BeautifulSoup · Requests · Pandas · SQLite

## Conocimiento demostrado

La disciplina de los procesos de datos: separar las fases, registrar cada paso y verificar la carga con consultas SQL al final. La extracción web es solo una parte; la confiabilidad depende del flujo completo.
