---
title: "EDA Automatizado con Pandas Profiling"
description: "EDA en una línea: ydata-profiling (Pandas Profiling) genera un reporte completo de distribuciones, correlaciones y calidad de datos en segundos."
pubDate: 2024-05-01
category: "Notebooks Analytics"
tags: ["Python", "Pandas", "EDA", "ydata-profiling", "Data Analysis"]
github: "https://github.com/HoracioLaphitz/horaciolaphitz.github.io/blob/main/public/Proyectos/Notebooks/Pandas_Profiling/Pandas_Profiling.ipynb"
draft: false
resources:
  notebooks:
    - name: "Pandas Profiling"
      path: "/Proyectos/Notebooks/Pandas_Profiling/Pandas_Profiling.ipynb"
---

## El problema

Un EDA manual completo — distribuciones, correlaciones, nulos, duplicados — consume horas de trabajo repetitivo antes de la primera decisión sobre los datos.

## Resolución

- **ydata-profiling** (ex Pandas Profiling) sobre el DataFrame: una llamada genera el reporte HTML completo.
- El reporte cubre distribución por variable, matriz de correlaciones, valores faltantes, duplicados y alertas automáticas de calidad (alta cardinalidad, columnas constantes, correlaciones sospechosas).
- Lectura crítica del reporte para decidir los siguientes pasos de limpieza — la herramienta señala, el criterio decide.

## Tecnologías

Python · Pandas · ydata-profiling

## Conocimiento demostrado

Dónde está el límite de la automatización: el reporte reemplaza el trabajo mecánico del EDA, pero la interpretación de qué es un problema real y qué es ruido sigue siendo del analista.
