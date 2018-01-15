BROWSERIFY=node_modules/.bin/browserify
INFOLOG := \033[34m ▸\033[0m

page.js: index.js
	@echo "$(INFOLOG) Building page.js.."
	@$(BROWSERIFY) index.js --standalone page -o page.js

watch:
	find index.js | entr make page.js
.PHONY: watch
