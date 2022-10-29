import deepl
import os
import shutil
import glob

input_dir = 'html_en'
output_dir = 'html_ja'
translator = deepl.Translator(os.environ['DEEPL_AUTH_KEY'])

if os.path.exists(output_dir):
    shutil.rmtree(output_dir)
os.mkdir(output_dir)

input_file_paths = glob.glob("./" + input_dir + "/*.html")
for input_file_path in input_file_paths:
    output_file_path = input_file_path.replace(input_dir, output_dir)
    # Using translate_document_from_filepath() with file paths
    try:
        translator.translate_document_from_filepath(
            input_file_path,
            output_file_path,
            target_lang="JA",
        )
    except deepl.DocumentTranslationException as error:
        # If an error occurs during document translation after the document was
        # already uploaded, a DocumentTranslationException is raised. The
        # document_handle property contains the document handle that may be used to
        # later retrieve the document from the server, or contact DeepL support.
        doc_id = error.document_handle.id
        doc_key = error.document_handle.key
        print(f"Error after uploading ${error}, id: ${doc_id} key: ${doc_key}")
    except deepl.DeepLException as error:
        # Errors during upload raise a DeepLException
        print(error)
