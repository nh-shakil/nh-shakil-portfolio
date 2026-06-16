<?php

namespace App\Support;

use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Validation\ValidationException;

class ImageUpload
{
    public const MAX_KB = 10240;

    public static function assertValidFiles(Request $request, string $field = 'images'): void
    {
        $files = $request->file($field, []);
        if (! is_array($files)) {
            return;
        }

        foreach ($files as $index => $file) {
            if (! $file instanceof UploadedFile) {
                continue;
            }

            if (! $file->isValid()) {
                throw ValidationException::withMessages([
                    "{$field}.{$index}" => self::errorMessage($file),
                ]);
            }
        }
    }

    public static function errorMessage(UploadedFile $file): string
    {
        return match ($file->getError()) {
            UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE => 'Image is too large. Server limit is '.ini_get('upload_max_filesize').' per file — compress the image or use a smaller file.',
            UPLOAD_ERR_PARTIAL => 'Upload was interrupted. Please try again.',
            UPLOAD_ERR_NO_FILE => 'No file was uploaded.',
            UPLOAD_ERR_NO_TMP_DIR, UPLOAD_ERR_CANT_WRITE, UPLOAD_ERR_EXTENSION => 'Server could not save the file. Check storage permissions.',
            default => 'Image upload failed. Use JPG, PNG, or WebP under '.ini_get('upload_max_filesize').'.',
        };
    }

    /** @return list<string> */
    public static function imageRules(): array
    {
        return ['file', 'image', 'mimes:jpg,jpeg,png,webp,gif', 'max:'.self::MAX_KB];
    }
}
