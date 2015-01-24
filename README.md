Gmail Automation
=====================

Author: @jjkilpatrick / http://johnjameskilpatrick.co.uk

This script will run through your defined list of emails (input/test.csv) and attempt to login using the password set in the gmail.js app (application.global.password). If the script is successful it will place the email in the 'naughty' list and save this in output/results.json.

NOTE: I am not responsible for any trouble you get into or cause using this script. Please use it responsibly and at your own risk.

## Instructions for use

1. Ensure you have PhantomJS installed on your machine. I suggest using Homebrew: http://phantomjs.org/
2. Ensure you have CasperJS installed on your machine I suggest using Homebrew: http://casperjs.org
3. Clone the repo: `git@bitbucket.org:jjkilpatrick/gmail-hacker.git`
4. Make sure that input/data.csv is populated with your emails. List should be comma seperated
5. Then run "casperjs gmail.js"
6. When the script has finished, your results will be found in the output directory 'output'
