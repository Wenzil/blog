# Blogging platform

## Warning

This repo was put on GitHub for my own convenience. It is not actually ready for public
consumption. Use at your own risk!

## Overview

A platform for anyone to find, read, write, comment on, tag and publish blog articles
about wide variety of subjects and interests.

Editors can hand-pick blog articles written by the community for featuring on the
front page. Blog articles written by editors are featured on the front page by default.
Users can search blog articles by author and by tags.

## Media management

Users can upload images and render them in blog articles using Markdown. Images are
publicly accessible but can only be renamed and deleted by the user who uploaded them.

## Hosting considerations

For the first delivery, optimizing costs is the main goal.

### Heroku
Hobby dyno for $7/mo includes
- Heroku Postgres (10k rows, no high-availability)
- Heroku Redis (no high-availability)
- SSL termination
- Papertrail logging add-on

### Dokku+Linode
Linode 1GB costing $0.0075/hr ($5.00/mo)
- Free dokku postgres official plugin
- Free dokku redis official plugin
- Logging solution TBD
- Built-in support for managing SSL certificates

### AWS
- Computing: $0.0059/hr ($4.25/mo) for smallest On-Demand EC2 instance (t2.nano)
- Computing: 1yr term Reserved Instances are roughly 30% cheaper
- SQL: $0.018/hr ($12.96/mo) for smallest On-Demand RDS instance (t2.micro)
- SQL: 1yr term Reserved Instances are roughly 30% cheaper
- NoSQL: DynamoDB pricing based on read/write throughput
- Caching: Must also consider ElastiCache (no high-availability) pricing
- Logging: $0.018/hr ($12.96/mo) for smallest AWS ElasticSearch instance (t2.micro.elasticsearch)
- Logging: $0.50 per GB ingested by CloudWatch logs
- SSL termination: $0.025/hr ($18.00/mo) on a load balancer
- SSL termination: Free on a Nginx proxy (https://bluefletch.com/blog/domain-agnostic-letsencrypt-ssl-config-for-elastic-beanstalk-single-instances/)

### Google Cloud
- Computing: 28 free instance hours a day (f1-micro)
- SQL: $0.0105/hr ($7.56/mo) for sustained use of smallest Cloud SQL second generation instance (db-f1-micro)
- SQL: Must also consider storage and network costs in Cloud SQL pricing
- NoSQL: 1GB of free Datastore storage
- Caching: Must also consider third-party Redis Cloud (no high-availability) pricing
- Logging: 5 GB of free logs ingestion monthly with 7 day retention with Stackdriver
- SSL termination: $0.025/hr ($18.00/mo) on a load balancer
- SSL termination: Free on a Nginx proxy (https://bluefletch.com/blog/domain-agnostic-letsencrypt-ssl-config-for-elastic-beanstalk-single-instances/)
