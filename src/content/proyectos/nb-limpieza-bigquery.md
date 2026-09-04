---
title: "Limpieza de Datos para Google BigQuery"
description: "Cuaderno de preparación y limpieza que deja los datos listos para cargarlos y consultarlos en Google BigQuery."
pubDate: 2024-05-01
category: "Notebooks Analytics"
tags: ["Python", "Pandas", "Data Cleaning", "BigQuery", "SQL"]
github: "https://github.com/HoracioLaphitz/horaciolaphitz.github.io/blob/main/public/Proyectos/Notebooks/Clean_for_google_bigquery.ipynb"
draft: false
resources:
  notebooks:
    - name: "Limpieza de Datos para BigQuery"
      path: "/Proyectos/Notebooks/Clean_for_google_bigquery.ipynb"
---

## El problema

**BigQuery** rechaza cargas con esquema inconsistente: nombres de columna con caracteres inválidos, tipos mezclados y nulos donde no van. Los datos crudos casi nunca llegan en ese estado.

## Resolución

- Diagnóstico inicial del conjunto de datos con **Pandas** y Seaborn: tipos, nulos y valores fuera de rango.
- Normalización de nombres de columna con **expresiones regulares** (`re`) al formato que BigQuery exige: sin espacios ni caracteres especiales.
- Tipado explícito de cada columna y tratamiento de nulos, dejando el DataFrame listo para carga directa sin errores de esquema.

## Tecnologías

Python · Pandas · Regex · Google BigQuery

## Conocimiento demostrado

Que el warehouse define el contrato: la limpieza local tiene que apuntar al esquema que el destino exige, no a un estándar genérico de "datos limpios".
