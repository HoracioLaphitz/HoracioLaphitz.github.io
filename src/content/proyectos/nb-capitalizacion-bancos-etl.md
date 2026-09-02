---
title: "Capitalización de Bancos"
description: "Web scraping de los bancos más grandes del mundo y un pipeline ETL para análisis en SQL y python."
pubDate: 2024-03-22
category: "Notebooks Analytics"
tags: ["Python", "Web Scraping", "ETL", "SQLite", "Pandas", "BeautifulSoup"]
github: "https://github.com/HoracioLaphitz/Capitalizacion-del-Mercado-de-los-Bancos-mas-Grandes"
showcase:
  context: "La capitalización de mercado de los bancos más grandes vive en una tabla de Wikipedia: sin API, sin CSV descargable."
  contribution: "Web scraping con BeautifulSoup, pipeline ETL completo (extracción, transformación, carga a SQLite + CSV) con logging."
  result: "Dato capturado y consultable por SQL, pipeline auditable con logging por etapa."
  evidenceAction: "Ver notebook y código en GitHub"
draft: false
featured: true
resources:
  notebooks:
    - name: "Capitalización de Bancos — ETL"
      path: "/Proyectos/Notebooks/Banks_Project.ipynb"
---

## El problema

La capitalización de mercado de los bancos más grandes del mundo vive en una tabla de Wikipedia: sin API, sin CSV descargable. Proyecto de la carrera de **Data Engineering de IBM**: construir el pipeline completo para capturar ese dato y dejarlo consultable.

## Resoluciónn

Un pipeline **ETL** de punta a punta:

- **Extracción** — scraping de la tabla con `requests` + **BeautifulSoup**, parseando el HTML a un DataFrame de Pandas.
- **Transformación** — limpieza de los montos y conversión de la capitalización a múltiples monedas usando tasas de cambio desde un CSV.
- **Carga** — persistencia doble: base **SQLite** consultable por SQL y archivo CSV.
- **Logging** — función de log propia que registra cada etapa del pipeline con timestamp, para poder auditar qué corrió y cuándo.

## Stack

Python · BeautifulSoup · Requests · Pandas · SQLite

## Conocimiento Demostrado

La disciplina de pipelines: separar las fases, registrar cada paso y verificar la carga con consultas SQL al final. El scraping es lo de menos; la confiabilidad del flujo es el trabajo.
