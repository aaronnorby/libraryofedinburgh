NAME ?= library
VERSION = `git describe`

bundle:
		git archive --format=zip HEAD > $(NAME)-$(VERSION).zip

zip:
		zip -r $(NAME)-$(VERSION).zip . -x webapp/node_modules/\*

run:
		$(PWD)/dockerutils/start.sh

.PHONY: bundle zip run
