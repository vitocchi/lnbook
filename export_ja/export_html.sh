#! /bin/sh
rm -rf html_en
mkdir html_en
asciidoctor ../*.asciidoc -D html_en