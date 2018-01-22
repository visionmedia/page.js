ROLLUP=node_modules/.bin/rollup
INFOLOG := \033[34m ▸\033[0m

page.js: index.js
	@echo "$(INFOLOG) Building page.js.."
	@$(ROLLUP) -c rollup.config.js

watch:
	find index.js | entr make page.js
.PHONY: watch

clean:
	@rm page.js
.PHONY: clean
