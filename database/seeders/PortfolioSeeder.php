<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\Project;
use App\Models\Setting;
use App\Models\TimelineItem;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedSettings();
        $this->seedTimeline();
        $this->seedProjects();
        $this->seedBlogPosts();
    }

    private function seedSettings(): void
    {
        $pairs = [
            'site_name' => 'NH Shakil',
            'site_title' => 'Software Engineer & Full Stack Developer',
            'site_location' => 'Bangladesh',
            'site_tagline' => 'I build clean, responsive web & mobile products with premium UI, reliable APIs, and scalable architecture.',
            'profile_image' => '/uploads/profilephotos.jpeg',
            'email' => 'nhshakil.ee@gmail.com',
            'whatsapp' => '+8801643894554',
            'github' => 'https://github.com/nh-shakil',
            'linkedin' => 'https://www.linkedin.com/in/engrnhshakil/',
            'facebook' => 'https://www.facebook.com/Engr.nhshakil',
            'instagram' => 'https://www.instagram.com/nhshakil.ee/',
            'website' => 'https://nhshakil.softzen.net',
            'company' => 'https://softzen.net/',
            'hero_availability' => 'Available for freelance • Open to remote roles',
            'hero_note_title' => 'What I care about',
            'hero_note' => 'Clean code, practical architecture, and UI that feels fast—on mobile first.',
            'hero_metric_1_label' => 'Primary',
            'hero_metric_1_value' => 'Laravel (Backend) • REST API',
            'hero_metric_2_label' => 'Frontend',
            'hero_metric_2_value' => 'React • Tailwind',
            'hero_metric_3_label' => 'Mobile',
            'hero_metric_3_value' => 'Flutter',
            'hero_metric_4_label' => 'Workflow',
            'hero_metric_4_value' => 'Git • GitHub',
            'about_headline' => 'Building modern products end-to-end.',
            'about_bio' => "I'm NH Shakil—an Electrical Engineer & Laravel Developer focused on clean, responsive, and unique solutions based on real client requirements.\nI build backend systems with Laravel, design scalable REST APIs, and integrate modern frontend tools for a premium product experience.\nI bridge software and engineering thinking to deliver practical, maintainable, real-world solutions.",
            'about_availability' => 'Open to opportunities • Bangladesh • Remote-friendly',
            'contact_headline' => "Let's build something premium.",
            'contact_desc' => "Send a message and I'll reply with next steps, timeline, and a clear estimate.",
            'cta_primary_label' => 'View Projects',
            'cta_primary_href' => '#projects',
            'cta_secondary_label' => 'Contact Me',
            'cta_secondary_href' => '#contact',
        ];

        foreach ($pairs as $key => $value) {
            Setting::query()->updateOrCreate(
                ['key' => $key],
                ['value' => $value],
            );
        }
    }

    private function seedProjects(): void
    {
        $rows = [
            [
                'title' => 'Laravel + Flutter Tourism App',
                'excerpt' => 'Custom Admin Panel (Laravel) + Mobile App (Flutter) for exploring historical places and tours.',
                'description' => 'A tourism-focused platform with admin management and a mobile experience built for users to explore places, content, and tours.',
                'tech_stack' => ['Laravel', 'Flutter', 'REST API', 'MySQL'],
                'role' => 'Full Stack',
                'client' => 'International Client',
                'is_featured' => true,
                'sort_order' => 10,
            ],
            [
                'title' => 'Audiotour / Audioguide Platform',
                'excerpt' => 'Android app + backend API for guided tours, content delivery, and admin management.',
                'description' => 'Built an audioguide experience with admin content control and mobile-first UX.',
                'tech_stack' => ['Flutter', 'Laravel', 'API Development'],
                'role' => 'Backend + Mobile',
                'client' => 'Client Project',
                'is_featured' => true,
                'sort_order' => 20,
            ],
            [
                'title' => 'Notification System (Users + Admin)',
                'excerpt' => 'A complete notification engine to support both users and admins with scalable structure.',
                'description' => 'Designed a robust notification flow for multiple actors and future extensibility.',
                'tech_stack' => ['Laravel', 'REST API', 'Backend'],
                'role' => 'Backend',
                'client' => 'Internal/Client',
                'is_featured' => false,
                'sort_order' => 30,
            ],
        ];

        foreach ($rows as $r) {
            $slug = Str::slug($r['title']);
            Project::query()->updateOrCreate(
                ['slug' => $slug],
                array_merge($r, ['slug' => $slug]),
            );
        }
    }

    private function seedTimeline(): void
    {
        $items = [
            [
                'type' => 'experience',
                'title' => 'Back End Developer',
                'org' => 'Intigrad Technologies (Australia)',
                'period' => 'Jul 2025 — Present',
                'desc' => 'Backend web development with Laravel, API integration, and production-focused engineering practices.',
                'is_published' => true,
                'sort_order' => 10,
            ],
            [
                'type' => 'experience',
                'title' => 'Instructor',
                'org' => 'Shahrasti Science and Technology Institute',
                'period' => 'Jan 2024 — Present',
                'desc' => 'Teaching and mentoring with a focus on practical skills, structured learning, and real-world examples.',
                'is_published' => true,
                'sort_order' => 20,
            ],
            [
                'type' => 'education',
                'title' => 'Diploma in Electrical Engineering (Completed)',
                'org' => 'CCN Polytechnic Institute',
                'period' => '2020 — 2024',
                'desc' => 'Completed foundational engineering coursework with practical lab-based learning and project work.',
                'is_published' => true,
                'sort_order' => 30,
            ],
            [
                'type' => 'education',
                'title' => 'BSc in Computer Science',
                'org' => 'University of South Asia',
                'period' => 'Ongoing',
                'desc' => 'Studying computer science with focus on software engineering, web technologies, and system design.',
                'is_published' => true,
                'sort_order' => 40,
            ],
        ];

        foreach ($items as $row) {
            TimelineItem::query()->updateOrCreate(
                ['type' => $row['type'], 'title' => $row['title'], 'org' => $row['org']],
                $row,
            );
        }
    }

    private function seedBlogPosts(): void
    {
        $posts = [
            [
                'title' => 'How I structure scalable Laravel APIs',
                'excerpt' => 'Validation, resources, and clean modules for long-term maintenance.',
                'content' => "A short post about building scalable APIs: validation rules, resources, versioning, and clean module boundaries.\n\n(Replace this with your real blog content.)",
                'is_published' => true,
                'sort_order' => 10,
            ],
            [
                'title' => 'Laravel + Flutter: shipping an admin panel and mobile app',
                'excerpt' => 'A practical overview of an end-to-end delivery workflow.',
                'content' => "How I plan, build, test, and deploy a full system.\n\n(Replace this with your real blog content.)",
                'is_published' => false,
                'sort_order' => 20,
            ],
        ];

        foreach ($posts as $p) {
            $slug = Str::slug($p['title']);
            BlogPost::query()->updateOrCreate(
                ['slug' => $slug],
                array_merge($p, ['slug' => $slug]),
            );
        }
    }
}

