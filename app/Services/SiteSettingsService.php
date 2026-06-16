<?php

namespace App\Services;

use App\Models\Setting;
use App\Models\TimelineItem;
use App\Models\GalleryItem;

class SiteSettingsService
{
    public static function textKeys(): array
    {
        return [
            'site_name',
            'site_title',
            'site_location',
            'site_tagline',
            'profile_image',
            'email',
            'whatsapp',
            'github',
            'linkedin',
            'facebook',
            'instagram',
            'website',
            'company',
            'hero_availability',
            'hero_note_title',
            'hero_note',
            'hero_metric_1_label',
            'hero_metric_1_value',
            'hero_metric_2_label',
            'hero_metric_2_value',
            'hero_metric_3_label',
            'hero_metric_3_value',
            'hero_metric_4_label',
            'hero_metric_4_value',
            'about_headline',
            'about_bio',
            'about_availability',
            'contact_headline',
            'contact_desc',
            'cta_primary_label',
            'cta_primary_href',
            'cta_secondary_label',
            'cta_secondary_href',
        ];
    }

    public static function fileKeys(): array
    {
        return ['cv_file'];
    }

    public static function allKeys(): array
    {
        return array_merge(self::textKeys(), self::fileKeys());
    }

    public static function getMap(): array
    {
        return Setting::query()
            ->whereIn('key', self::allKeys())
            ->pluck('value', 'key')
            ->all();
    }

    public static function publicUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        if (str_starts_with($path, '/')) {
            return $path;
        }

        return asset('storage/'.$path);
    }

    public static function toSiteArray(): array
    {
        $s = self::getMap();
        $get = fn (string $key, mixed $default = null) => $s[$key] ?? $default;

        $metrics = [];
        for ($i = 1; $i <= 4; $i++) {
            $label = trim((string) $get("hero_metric_{$i}_label", ''));
            $value = trim((string) $get("hero_metric_{$i}_value", ''));
            if ($label !== '' && $value !== '') {
                $metrics[] = ['label' => $label, 'value' => $value];
            }
        }

        $bioRaw = (string) $get('about_bio', '');
        $bio = array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $bioRaw) ?: [])));

        $email = trim((string) $get('email', ''));
        $whatsapp = trim((string) $get('whatsapp', ''));

        $timeline = TimelineItem::query()
            ->where('is_published', true)
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get()
            ->map(fn (TimelineItem $t) => [
                'type' => $t->type,
                'title' => $t->title,
                'org' => $t->org,
                'employmentType' => $t->employment_type,
                'period' => $t->period,
                'location' => $t->location,
                'desc' => $t->desc,
                'skills' => $t->skills
                    ? array_values(array_filter(array_map('trim', explode(',', $t->skills))))
                    : [],
            ])
            ->values()
            ->all();

        $gallery = GalleryItem::query()
            ->with('images')
            ->where('is_published', true)
            ->orderBy('sort_order')
            ->orderByDesc('id')
            ->get()
            ->filter(fn (GalleryItem $item) => $item->images->isNotEmpty())
            ->map(fn (GalleryItem $item) => [
                'id' => $item->id,
                'title' => $item->title,
                'caption' => $item->caption,
                'images' => $item->images->map(fn ($img) => [
                    'id' => $img->id,
                    'url' => self::publicUrl($img->path),
                    'alt' => $img->alt ?: $item->title,
                ])->values()->all(),
            ])
            ->values()
            ->all();

        return [
            'name' => $get('site_name'),
            'title' => $get('site_title'),
            'location' => $get('site_location'),
            'tagline' => $get('site_tagline'),
            'profileImage' => self::publicUrl($get('profile_image')),
            'cvUrl' => self::publicUrl($get('cv_file')),
            'timeline' => $timeline,
            'gallery' => $gallery,
            'socials' => [
                'github' => $get('github'),
                'linkedin' => $get('linkedin'),
                'facebook' => $get('facebook'),
                'instagram' => $get('instagram'),
                'website' => $get('website'),
                'company' => $get('company'),
                'email' => $email !== ''
                    ? (str_starts_with($email, 'mailto:') ? $email : 'mailto:'.$email)
                    : null,
                'whatsapp' => $whatsapp !== ''
                    ? (str_starts_with($whatsapp, 'http') ? $whatsapp : 'https://wa.me/'.preg_replace('/\D+/', '', $whatsapp))
                    : null,
            ],
            'hero' => [
                'availability' => $get('hero_availability'),
                'metrics' => $metrics,
                'noteTitle' => $get('hero_note_title'),
                'note' => $get('hero_note'),
            ],
            'ctas' => [
                'primary' => [
                    'label' => $get('cta_primary_label'),
                    'href' => $get('cta_primary_href'),
                ],
                'secondary' => [
                    'label' => $get('cta_secondary_label'),
                    'href' => $get('cta_secondary_href'),
                ],
            ],
            'about' => [
                'headline' => $get('about_headline'),
                'bio' => $bio,
                'availability' => $get('about_availability'),
            ],
            'contact' => [
                'headline' => $get('contact_headline'),
                'desc' => $get('contact_desc'),
            ],
        ];
    }
}
