# Blogging platform

## Description

A platform for anyone to find, read, write, comment on, tag and publish blog articles
about wide variety of subjects and interests.

Editors can hand-pick blog articles written by the community for featuring on the
front page. Blog articles written by editors are featured on the front page by default.
Users can search blog articles by author and by tags.

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
- $0.018/hr ($12.96/mo) for smallest On-Demand RDS instance (t2.micro)
- $0.0059/hr ($4.25/mo) for smallest On-Demand EC2 instance (t2.nano)
- 1yr term Reserved Instances are roughly 30% cheaper
- Must also consider ElastiCache (no high-availability) pricing
- Must also consider ElasticSearch (no high-availability) pricing
- SSL Termination solution TBD

### Google Cloud
- $0.0105/hr ($7.56/mo) for sustained use of smallest Cloud SQL second generation instance (db-f1-micro)
- Must also consider storage and network costs in Cloud SQL pricing
- $0.0056/hr ($4.03/mo) for sustained use of smallest Compute Engine instance (f1-micro)
- Must also consider third-party Redis Cloud (no high-availability) pricing
- Logging solution TBD
- SSL Termination solution TBD
