# The MIT License (MIT)
#
# Copyright (c) 2018-present Noumaan Shah
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

# For help, simply enter at your command prompt:
# make

# You may change these variables based on your setup
# SRC - points to directory containing source files which will be copied from
SRC := src
# DEST - points to directory where files will be copied to
DEST := app
# PWD_BASE - point to the last part of ${PWD} where this Makefile is located
# used during livesync
PWD_BASE := nativescript

# These variables are used for argument processing
ARGS ?=
# PLATFORM - can be ios / android
PLATFORM ?= ios
# VERBOSE - set to show output messages
VERBOSE ?=

# Internally used variables - you probably don't need to modify these:
# Finds relative path for your shared files, used by watch for livesync
# NOTE: This cannot be a link or an absolute path, therefore use
# readlink and patsubst to create a relative path
APP_BASE := $(patsubst ../../%,%, $(shell readlink ${SRC}/app))

# Typescript sources and their destination
ts_files = $(shell find -L ${SRC} -name '*.ts' | grep -v '.tns.ts' | grep -v '.spec.ts')
ts_files_d = $(ts_files:${SRC}/%.ts=${DEST}/%.ts)

# HTML sources and their destination
tns_templates = $(shell find -L ${SRC} -name '*.tns.html' -o -name '*.tns.ios.html' -o -name '*.tns.android.html')
tns_templates_d = $(patsubst ${SRC}/%.html, ${DEST}/%.html, $(subst .tns.,.,${tns_templates}))

# SCSS / CSS sources and their destination, an exclude list also needs to be created since we are using rsync
tns_styles = $(shell find -L ${SRC} -name '*.tns.scss' -o -name '*.tns.ios.scss' -o -name '*.tns.android.scss' -o -name '*.tns.css' -o -name '*.tns.ios.css' -o -name '*.tns.android.css')
tns_styles_d = $(patsubst ${SRC}/%.scss, ${DEST}/%.scss, $(patsubst ${SRC}/%.css, ${DEST}/%.css, $(subst .tns.,.,${tns_styles})))
# Create exclude list since .tns.*scss will be used instead of .scss
exclude_tns_styles = $(tns_styles_d:${DEST}/%=--exclude=/%)

watch_extensions := '*.ts' '*.html' '*.scss' '*.css'
watch_src = $(subst *.,${PWD_BASE}/${SRC}/**/*.,${watch_extensions})
watch_app = $(subst *.,${APP_BASE}/**/*.,${watch_extensions})

ifdef VERBOSE
	rsync_opts := --out-format='%n%L -> ${DEST}/%n%L'
else
	rsync_opts :=
endif

# NOTE: echo -e cannot be used since it is not portable
help:
	@echo
	@echo 'Build and run NativeScript application'
	@echo
	@echo 'Useful targets which serve as shortcuts:'
	@echo 'make run.ios           - similar to make run PLATFORM="ios"'
	@echo 'make run.android       - similar to make run PLATFORM="android"'
	@echo "make build.ios         - similar to make build PLATFORM=\"ios\" ARGS='\"--release --env.prod --env.aot --env.uglify --env.report\"'"
	@echo "make build.android     - similar to make build PLATFORM=\"android\" ARGS='\"--release --env.prod --env.aot --env.uglify --env.report\"'"
	@echo 'make runbundle.ios     - similar to make run PLATFORM="ios" with --bundle --release --env.prod --env.aot flags'
	@echo 'make runbundle.android - similar to make run PLATFORM="android" with --bundle --release --env.prod --env.aot flags'
	@echo
	@echo 'make build PLATFORM="<Platform>"'
	@echo 'Runs tns prepare and then builds using webpack, tns build --bundle'
	@echo 'Defaults to ios as Platform, but you can use ios / android'
	@echo 'The default settings for tns build are just to use the bundle flag.'
	@echo 'You can turn on AOT and uglify by:'
	@echo "make build PLATFORM=\"<Platform>\" ARGS='\"--env.aot --env.uglify\"'"
	@echo
	@echo 'make run PLATFORM="<Platform>"'
	@echo 'Builds and executes tns run <Platform>'
	@echo 'Defaults to ios as Platform, but you can use ios / android'
	@echo
	@echo 'make livesync'
	@echo 'Watches for file changes'
	@echo
	@echo 'make debug PLATFORM="<Platform>"'
	@echo 'Builds and executes tns debug <Platform>'
	@echo
	@echo 'make help'
	@echo 'Displays this help message'
	@echo
	@echo 'make clean'
	@echo 'Cleans up your app folder'
	@echo
	@echo 'You can pass arguments to some targets by using the ARG variable, e.g.:'
	@echo 'make run ARGS="--emulator"'
	@echo
	@echo 'For multiple arguments with spaces, use strong quotes'
	@echo "make run ARGS='\"--clean --emulator\"'"
	@echo
	@echo 'In order to livesync, you would need to install watchman:'
	@echo 'https://facebook.github.io/watchman/docs/install.html'
	@echo

run.ios:
	@make run PLATFORM='ios'

run.android:
	@make run PLATFORM='android'

run: prepTablet
	tns run ${PLATFORM} ${ARGS}

runbundle.ios:
	@make run PLATFORM='ios' ARGS='${ARGS} --bundle --env.prod --env.aot'

runbundle.android:
	@make run PLATFORM='android' ARGS='${ARGS} --bundle --env.prod --env.aot --env.snapshot'

debug.ios:
	@make debug PLATFORM='ios'

debug.android:
	@make debug PLATFORM='android'

debug: prepTablet
	tns debug ${PLATFORM} ${ARGS}

# TODO: --env.uglify causes Javascript heap out of memory
build.ios:
	@make build PLATFORM='ios' ARGS='--release --env.prod --env.aot --env.report'

build.android:
	@make build PLATFORM='android' ARGS='--release --env.prod --env.aot --env.uglify --env.snapshot --env.report'

build: prepTablet
	tns prepare ${PLATFORM}
	tns build ${PLATFORM} --bundle ${ARGS}

prepPhone: prepTablet
	echo 'Prepared Phone setup'

prepTablet: ${DEST}/tsconfig.json ${DEST}/package.json ${DEST}/App_Resources ${DEST}/assets ${DEST}/fonts livesyncDeps
	@echo 'Prepared Tablet / default setup'

livesyncDeps: ${ts_files_d} project.Styles ${tns_templates_d} ${tns_styles_d}
	@echo 'Livesynced files...'

# Need to run livesync a level up since watchman doesn't follow links and only monitors files underneath
# working directory.
livesync:
	@cd .. && watchman-make -p ${watch_src} ${watch_app} --run 'cd ${PWD_BASE} && make livesyncDeps'

${DEST}/%.ts: ${SRC}/%.ts
	@mkdir -p $(@D)
	@cp -p $< $@

${DEST}/%.html: ${SRC}/%.tns.html
	@mkdir -p $(@D)
	@cp -p $< $@

${DEST}/%.android.html: ${SRC}/%.tns.android.html
	@mkdir -p $(@D)
	@cp -p $< $@

${DEST}/%.ios.html: ${SRC}/%.tns.ios.html
	@mkdir -p $(@D)
	@cp -p $< $@

${DEST}/%.scss: ${SRC}/%.tns.scss
	@mkdir -p $(@D)
	@cp -p $< $@

${DEST}/%.android.scss: ${SRC}/%.tns.android.scss
	@mkdir -p $(@D)
	@cp -p $< $@

${DEST}/%.ios.scss: ${SRC}/%.tns.ios.scss
	@mkdir -p $(@D)
	@cp -p $< $@

${DEST}/%.css: ${SRC}/%.tns.css
	@mkdir -p $(@D)
	@cp -p $< $@

${DEST}/%.android.css: ${SRC}/%.tns.android.css
	@mkdir -p $(@D)
	@cp -p $< $@

${DEST}/%.ios.css: ${SRC}/%.tns.ios.css
	@mkdir -p $(@D)
	@cp -p $< $@

${DEST}/tsconfig.json: ${SRC}/tsconfig.json ${DEST}
	@cp -p $< $@

${DEST}/package.json: ${SRC}/package.json ${DEST}
	@cp -p $< $@

${DEST}/App_Resources: App_Resources ${DEST}
	@echo 'Copying App_Resources'
	@rsync -La ${rsync_opts} --del $< ${DEST}

${DEST}/assets: ${SRC}/assets ${DEST}
	@echo 'Copying Assets'
	@rsync -La ${rsync_opts} --del $< ${DEST}

${DEST}/fonts: ${SRC}/fonts ${DEST}
	@echo 'Copying Fonts'
	@rsync -La ${rsync_opts} --del $< ${DEST}

project.Styles: ${SRC}/ ${DEST}
	@echo 'Copying Styles'
	@rsync -Lma ${rsync_opts} --include='*/' --exclude='*.tns.*' ${exclude_tns_styles} --include='*.scss' --include='*.css' --exclude='*' $< ${DEST}

print-%  : ; @echo $* = $($*)

clean:
	@rm -rf ${DEST}

${DEST}:
	@mkdir -p $@

.PHONY: build help run debug run.ios run.android build.ios build.android runbundle.ios runbundle.android debug debug.ios debug.android prepPhone prepTablet livesync livesyncDeps clean ${DEST}/App_Resources ${DEST}/assets project.Styles
