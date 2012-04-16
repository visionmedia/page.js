
all: build/page.min.js stats

build/page.min.js: build/page.js
	uglifyjs --no-mangle < $< > $@

build/page.js: lib/page.js
	@mkdir -p build
	cp $< $@

stats:
	@gzip build/page.min.js -c > build/page.gz
	@wc -c build/page.js
	@wc -c build/page.min.js
	@wc -c build/page.gz
	@rm -f build/page.gz

.PHONY: stats