---
title: "Snowflake Integration"
date: "2020-12-17"
category: ["JavaScript", "Node.js", "Snowflake", "New Relic"]
cover: "/images/blog/snowflake-cover.png"
thumb: "/images/blog/sm/snowflake-thumb.png"
---

## New Relic Snowflake integration

[GitHub](https://newrelic.com/blog/how-to-relic/nextjs-monitor-application-data) - for the full source code

This project started as an open source contribution to the New Relic community and thanks to its popularity is now a Community Plus project supported by New Relic.

It is a New Relic integration with Snowflake to monitor query performance, logins, potential security incidents, optimise warehouse and cloud credit costs, capture any data stored in Snowflake for real-time alerting and reporting. It comes with out of the box queries to capture a good range of performance related metrics. It is easily extendible to create custom queries to capture any other metrics that are not covered by default. 

### Main features

- Out of the box queries to capture:
  - account metrics
  - automatic clustering usage
  - credit usage by warehouse
  - data transfer usage
  - storage usage
  - login history
  - longest quries
  - pipe usage
  - query history
  - replication usage
  - stage storage usage
  - werehouse load history
  - werehouse metering
- Yaml configuration file to easily set up the integration
  - with obfuscation of sensitive data
  - supports authentication 
    - with username and password
    - with OAuth
- Releases for Windows, Linux and Mac
- Extensible to create custom queries

### Libraries and tools used

- [Snowflake JS SDK](https://docs.snowflake.com/en/user-guide/nodejs-driver.html) - to connect to Snowflake
- [NR Flex](https://docs.newrelic.com/docs/infrastructure/host-integrations/host-integrations-list/flex-integration-tool-build-your-own-integration/) - to create the integration
- [GitHub Actions](https://github.com/features/actions) - to build and release the integration as a binary for multiple platforms