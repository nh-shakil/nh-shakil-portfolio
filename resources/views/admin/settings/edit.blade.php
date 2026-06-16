@extends('admin.layout')

@php
    use App\Services\SiteSettingsService;

    $val = fn (string $key) => old('values.'.$key, $settings[$key]->value ?? '');
    $profilePreview = SiteSettingsService::publicUrl($settings['profile_image']->value ?? null);
    $cvPath = $settings['cv_file']->value ?? null;
    $cvUrl = SiteSettingsService::publicUrl($cvPath);
    $inputClass = 'mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/90 outline-none focus:border-white/20 focus:ring-2 focus:ring-cyan-300/30';
@endphp

@section('content')
    <div class="flex items-center justify-between">
        <div>
            <div class="text-sm text-white/60">Settings</div>
            <div class="mt-1 text-xs text-white/50">Profile, hero content, contact links, and CV upload.</div>
        </div>
    </div>

    <form method="POST" action="{{ route('admin.settings.update') }}" enctype="multipart/form-data" class="mt-6 space-y-6">
        @csrf

        <div class="rounded-[var(--radius-2xl)] border border-white/10 bg-white/5 p-6">
            <div class="text-sm font-semibold text-white">Profile</div>
            <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label class="block sm:col-span-2">
                    <div class="text-xs font-medium tracking-wide text-white/60">Name</div>
                    <input name="values[site_name]" value="{{ $val('site_name') }}" class="{{ $inputClass }}" />
                </label>
                <label class="block sm:col-span-2">
                    <div class="text-xs font-medium tracking-wide text-white/60">Title</div>
                    <input name="values[site_title]" value="{{ $val('site_title') }}" class="{{ $inputClass }}" />
                </label>
                <label class="block">
                    <div class="text-xs font-medium tracking-wide text-white/60">Location</div>
                    <input name="values[site_location]" value="{{ $val('site_location') }}" class="{{ $inputClass }}" />
                </label>
                <label class="block sm:col-span-2">
                    <div class="text-xs font-medium tracking-wide text-white/60">Tagline</div>
                    <textarea name="values[site_tagline]" rows="2" class="{{ $inputClass }}">{{ $val('site_tagline') }}</textarea>
                </label>
                <label class="block sm:col-span-2">
                    <div class="text-xs font-medium tracking-wide text-white/60">Profile image path</div>
                    <input name="values[profile_image]" value="{{ $val('profile_image') }}" placeholder="/uploads/profilephotos.jpeg" class="{{ $inputClass }}" />
                    <div class="mt-1 text-xs text-white/45">Use a public path or upload a new image below.</div>
                </label>
                <label class="block sm:col-span-2">
                    <div class="text-xs font-medium tracking-wide text-white/60">Upload profile image</div>
                    <input type="file" name="profile_image_upload" accept="image/*" class="mt-2 block w-full text-sm text-white/70 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-black" />
                    @if ($profilePreview)
                        <div class="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-3">
                            <img src="{{ $profilePreview }}" alt="Profile preview" class="h-36 w-36 rounded-xl object-contain" />
                        </div>
                    @endif
                </label>
            </div>
        </div>

        <div class="rounded-[var(--radius-2xl)] border border-white/10 bg-white/5 p-6">
            <div class="text-sm font-semibold text-white">CV / Resume</div>
            <div class="mt-4 grid grid-cols-1 gap-4">
                <label class="block">
                    <div class="text-xs font-medium tracking-wide text-white/60">Upload CV (PDF, DOC, DOCX)</div>
                    <input type="file" name="cv_file_upload" accept=".pdf,.doc,.docx,application/pdf" class="mt-2 block w-full text-sm text-white/70 file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-black" />
                </label>
                @if ($cvUrl)
                    <div class="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/75">
                        <span>Current CV:</span>
                        <a href="{{ $cvUrl }}" target="_blank" rel="noreferrer" class="text-cyan-200 hover:text-cyan-100">Download</a>
                        <label class="inline-flex items-center gap-2 text-rose-200">
                            <input type="checkbox" name="remove_cv" value="1" class="rounded border-white/20 bg-black/30" />
                            Remove CV
                        </label>
                    </div>
                @endif
            </div>
        </div>

        <div class="rounded-[var(--radius-2xl)] border border-white/10 bg-white/5 p-6">
            <div class="text-sm font-semibold text-white">Contact & Social</div>
            <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label class="block">
                    <div class="text-xs font-medium tracking-wide text-white/60">Email</div>
                    <input name="values[email]" value="{{ $val('email') }}" class="{{ $inputClass }}" />
                </label>
                <label class="block">
                    <div class="text-xs font-medium tracking-wide text-white/60">WhatsApp</div>
                    <input name="values[whatsapp]" value="{{ $val('whatsapp') }}" placeholder="+880..." class="{{ $inputClass }}" />
                </label>
                <label class="block">
                    <div class="text-xs font-medium tracking-wide text-white/60">GitHub URL</div>
                    <input name="values[github]" value="{{ $val('github') }}" class="{{ $inputClass }}" />
                </label>
                <label class="block">
                    <div class="text-xs font-medium tracking-wide text-white/60">LinkedIn URL</div>
                    <input name="values[linkedin]" value="{{ $val('linkedin') }}" class="{{ $inputClass }}" />
                </label>
                <label class="block">
                    <div class="text-xs font-medium tracking-wide text-white/60">Facebook URL</div>
                    <input name="values[facebook]" value="{{ $val('facebook') }}" class="{{ $inputClass }}" />
                </label>
                <label class="block">
                    <div class="text-xs font-medium tracking-wide text-white/60">Instagram URL</div>
                    <input name="values[instagram]" value="{{ $val('instagram') }}" class="{{ $inputClass }}" />
                </label>
                <label class="block">
                    <div class="text-xs font-medium tracking-wide text-white/60">Website URL</div>
                    <input name="values[website]" value="{{ $val('website') }}" class="{{ $inputClass }}" />
                </label>
                <label class="block">
                    <div class="text-xs font-medium tracking-wide text-white/60">Company URL</div>
                    <input name="values[company]" value="{{ $val('company') }}" class="{{ $inputClass }}" />
                </label>
            </div>
        </div>

        <div class="rounded-[var(--radius-2xl)] border border-white/10 bg-white/5 p-6">
            <div class="text-sm font-semibold text-white">Hero Section</div>
            <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label class="block sm:col-span-2">
                    <div class="text-xs font-medium tracking-wide text-white/60">Availability text</div>
                    <input name="values[hero_availability]" value="{{ $val('hero_availability') }}" class="{{ $inputClass }}" />
                </label>
                <label class="block">
                    <div class="text-xs font-medium tracking-wide text-white/60">Note title</div>
                    <input name="values[hero_note_title]" value="{{ $val('hero_note_title') }}" class="{{ $inputClass }}" />
                </label>
                <label class="block sm:col-span-2">
                    <div class="text-xs font-medium tracking-wide text-white/60">Note</div>
                    <textarea name="values[hero_note]" rows="2" class="{{ $inputClass }}">{{ $val('hero_note') }}</textarea>
                </label>
                @for ($i = 1; $i <= 4; $i++)
                    <label class="block">
                        <div class="text-xs font-medium tracking-wide text-white/60">Metric {{ $i }} label</div>
                        <input name="values[hero_metric_{{ $i }}_label]" value="{{ $val("hero_metric_{$i}_label") }}" class="{{ $inputClass }}" />
                    </label>
                    <label class="block">
                        <div class="text-xs font-medium tracking-wide text-white/60">Metric {{ $i }} value</div>
                        <input name="values[hero_metric_{{ $i }}_value]" value="{{ $val("hero_metric_{$i}_value") }}" class="{{ $inputClass }}" />
                    </label>
                @endfor
            </div>
        </div>

        <div class="rounded-[var(--radius-2xl)] border border-white/10 bg-white/5 p-6">
            <div class="text-sm font-semibold text-white">About & Contact</div>
            <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label class="block sm:col-span-2">
                    <div class="text-xs font-medium tracking-wide text-white/60">About headline</div>
                    <input name="values[about_headline]" value="{{ $val('about_headline') }}" class="{{ $inputClass }}" />
                </label>
                <label class="block sm:col-span-2">
                    <div class="text-xs font-medium tracking-wide text-white/60">About bio (one paragraph per line)</div>
                    <textarea name="values[about_bio]" rows="5" class="{{ $inputClass }}">{{ $val('about_bio') }}</textarea>
                </label>
                <label class="block sm:col-span-2">
                    <div class="text-xs font-medium tracking-wide text-white/60">About availability badge</div>
                    <input name="values[about_availability]" value="{{ $val('about_availability') }}" class="{{ $inputClass }}" />
                </label>
                <label class="block sm:col-span-2">
                    <div class="text-xs font-medium tracking-wide text-white/60">Contact headline</div>
                    <input name="values[contact_headline]" value="{{ $val('contact_headline') }}" class="{{ $inputClass }}" />
                </label>
                <label class="block sm:col-span-2">
                    <div class="text-xs font-medium tracking-wide text-white/60">Contact description</div>
                    <textarea name="values[contact_desc]" rows="2" class="{{ $inputClass }}">{{ $val('contact_desc') }}</textarea>
                </label>
            </div>
        </div>

        <div class="rounded-[var(--radius-2xl)] border border-white/10 bg-white/5 p-6">
            <div class="text-sm font-semibold text-white">Call to Action Buttons</div>
            <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label class="block">
                    <div class="text-xs font-medium tracking-wide text-white/60">Primary button label</div>
                    <input name="values[cta_primary_label]" value="{{ $val('cta_primary_label') }}" class="{{ $inputClass }}" />
                </label>
                <label class="block">
                    <div class="text-xs font-medium tracking-wide text-white/60">Primary button link</div>
                    <input name="values[cta_primary_href]" value="{{ $val('cta_primary_href') }}" placeholder="#projects" class="{{ $inputClass }}" />
                </label>
                <label class="block">
                    <div class="text-xs font-medium tracking-wide text-white/60">Secondary button label</div>
                    <input name="values[cta_secondary_label]" value="{{ $val('cta_secondary_label') }}" class="{{ $inputClass }}" />
                </label>
                <label class="block">
                    <div class="text-xs font-medium tracking-wide text-white/60">Secondary button link</div>
                    <input name="values[cta_secondary_href]" value="{{ $val('cta_secondary_href') }}" placeholder="#contact" class="{{ $inputClass }}" />
                </label>
            </div>
        </div>

        <div class="flex justify-end">
            <button type="submit" class="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-white/90">
                Save Settings
            </button>
        </div>
    </form>
@endsection
