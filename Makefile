ROLLUP=node_modules/.bin/rollup
INFOLOG := \033[34m ▸\033[0m

all: page.js page.mjs
.PHONY: all

page.js: index.js
	@echo "$(INFOLOG) Building page.js.."
	@$(ROLLUP) -c rollup.config.js

page.mjs: index.js
	@echo "$(INFOLOG) Building page.mjs.."
	@$(ROLLUP) -c rollup.config.js -f es -o $@

watch:
	find index.js | entr make page.js
.PHONY: watch

clean:
	@rm page.js page.mjs
.PHONY: clean
