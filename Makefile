
BIN = ./node_modules/.bin/

page.js: index.js
	@$(BIN)browserify index.js --standalone page -o page.js

test:
	@./node_modules/.bin/serve test

.PHONY: test
