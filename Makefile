
all: build/page.min.js stats

build:
	@mkdir -p build

build/page.min.js: build/page.js
	uglifyjs --no-mangle < $< > $@

build/page.js: lib/page.js | build
	cp $< $@

stats:
	@gzip build/page.min.js -c > build/page.gz
	@wc -c build/page.js
	@wc -c build/page.min.js
	@wc -c build/page.gz
	@rm -f build/page.gz

test-browser:
	@./node_modules/.bin/serve test

test:
	@./node_modules/.bin/mocha test/tests.js

clean:
	rm -fr build

.PHONY: stats test clean
