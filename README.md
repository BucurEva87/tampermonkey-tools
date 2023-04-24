## TamperMonkey Tools

[TamperMonkey](https://www.tampermonkey.net/) is a very popular browser extension
available for Chrome, Microsoft Edge, Safari, Opera Next and Firefox. It allows users
to write their own scripts and inject them (on the client side) in the web pages they
visit. This allows users to enhance functionality as they need.

TamperMonkey tools is a project based around the idea of creating scripts for
my current needs and, even if it just began and even if it's a small project, I believe,
excepting myself, someone will find the scripts I'm writing as being useful.

As time will go by I will list here the categories of scripts I'll write.
For the time being the only category I'm interested in is GitHub.

## Prerequisits

You must have TamperMonkey installed.

## How to use a script

After you installed TamperMonkey, just copy the script you need from here, go to the page
you're going to use the script on (let's say you want to use a script on the GitHub page
you're creating a pull request in (as this is the first script I'm creating) - you will
navigate to `https://github.com/@gitHubUsername/@gitHubRepository/compare/...`), click on
the TamperMonkey extension icon, click on "Create a new script", paste the script you got
from here, then either click "File -> Save" or press "Ctrl" + "S". Refresh the page you're
going to use the script on and that's all!

## Categories

- GitHub
  -  [Generate Pull Request description from commit history](./GitHub/pullRequestDescriptionGenerator.js)
  	When you create a new Pull Request this script will create a button next to GitHub's "Create new pull request" button. Once pressed it will look at the commits' history, it will add all of them to an array (it will also clean them up, because not all commits should be accounted for) and will generate a message that you can use directly in ChatGPT and you will (hopefully) receive a Pull Request description based on what you commited in that branch. Please keep in mind that a proper commit message should not excede 50 characters. If your commit messages are longer than 68 characters, GitHub will split them in the commit history. Also remember that this script is not meant to be used for Pull Requests that have more than 40 commits. The description could become cumbersome for ChatGPT. If you try to use it under those conditions, you will receive a warning. If you ignore it, you use the script at your own risk.