# Hello world javascript action

[![Build Status](https://dev.azure.com/JIngzhuYan/0114NewProject/_apis/build/status/zhuorg.PRTest?branchName=master)](https://dev.azure.com/JIngzhuYan/0114NewProject/_build/latest?definitionId=334&branchName=master)

This action prints "Hello World" or "Hello" + the name of a person to greet to the log.

## Inputs

### `who-to-greet`

**Required** The name of the person to greet. Default `"World"`.

## Outputs

### `time`

The time we greeted you.

## Example usage

uses: actions/hello-world-javascript-action@v1
with:
  who-to-greet: 'Mona the Octocat'
