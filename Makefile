NAME ?= library
VERSION = `git describe`

bundle:
		git archive --format=zip HEAD > $(NAME)-$(VERSION).zip

.PHONY: bundle
