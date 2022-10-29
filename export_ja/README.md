# Export Ja

asciidocをDeepL APIで日本語に翻訳して、htmlファイルにexportするスクリプト

## 必要なもの

### Asciidoctor

```
sudo apt install asciidoctor
```

### Python3, Pip, and deepl lib

```
pip install deepl
```

### DeepL API Authentication Key

DeepL API Proライセンスの認証キー

## 手順

### 1 asciidocファイルをhtmlにexportする

```
sh export_html.sh
```

### 2 htmlファイルを日本語に翻訳する

```
DEEPL_AUTH_KEY=[put key here] python3 translate_to_ja.py
```

### 3 imagesファイルをコピーする

```
sh copy_images.sh
```

### 4 完成

成果物は`html_ja`に出力されている。