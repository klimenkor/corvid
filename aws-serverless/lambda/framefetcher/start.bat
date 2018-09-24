sls invoke local -f framefetcher -p framefetcher.json
python-lambda-local -l lib -f handler -t 30 framefetcher.py framefetcher.json
