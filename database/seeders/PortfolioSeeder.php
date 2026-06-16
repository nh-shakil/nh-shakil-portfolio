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
                'slug' => 'easydrop',
                'title' => 'EasyDrop',
                'excerpt' => 'Dropshipping platform — product sourcing, order flow, and merchant tools for modern e-commerce.',
                'description' => 'EasyDrop is a dropshipping solution built to simplify product sourcing, order management, and merchant operations with a clean, scalable web experience.',
                'tech_stack' => ['Laravel', 'PHP', 'MySQL', 'REST API', 'JavaScript'],
                'role' => 'Full Stack',
                'client' => 'EasyDrop',
                'live_url' => 'https://easydrop.asia/',
                'is_featured' => false,
                'completed_at' => '2024-08-15',
                'sort_order' => 10,
            ],
            [
                'slug' => 'profworkers-austria',
                'title' => 'Profworkers Austria',
                'excerpt' => 'EU job portal connecting expat candidates with employers across Europe — vacancies, categories, and applications.',
                'description' => 'Profworkers Austria is an international recruitment platform helping expat professionals find jobs across the EU with category search, vacancy listings, blogs, and end-to-end candidate support.',
                'tech_stack' => ['Laravel', 'PHP', 'MySQL', 'REST API', 'JavaScript'],
                'role' => 'Full Stack',
                'client' => 'Profworkers Austria',
                'live_url' => 'https://profworkers.at/',
                'is_featured' => false,
                'completed_at' => '2025-03-20',
                'sort_order' => 20,
            ],
            [
                'slug' => 'truck-koi',
                'title' => 'Truck Koi',
                'excerpt' => 'Bangladesh truck booking platform — post loads, find verified drivers, and manage logistics online.',
                'description' => 'Truck Koi connects shippers with verified truck drivers across Bangladesh. Users can post loads, browse available trucks, and book reliable transport with transparent pricing and 24/7 support.',
                'tech_stack' => ['Laravel', 'PHP', 'MySQL', 'REST API', 'JavaScript'],
                'role' => 'Full Stack',
                'client' => 'Truck Koi',
                'live_url' => 'https://truckkoi.com/web/',
                'is_featured' => false,
                'completed_at' => '2025-05-10',
                'sort_order' => 30,
            ],
            [
                'slug' => 'auditour-pompei',
                'title' => 'Auditour — Pompei Audioguide',
                'excerpt' => 'Landing site and content hub for the Pompei audio guide app — itineraries, tickets, and visitor information.',
                'description' => 'A dedicated web experience for Auditour\'s Pompei audioguide, helping visitors plan their trip with curated itineraries, practical info, and app download flows for iOS and Android.',
                'tech_stack' => ['Laravel', 'PHP', 'SEO', 'JavaScript'],
                'role' => 'Full Stack',
                'client' => 'Auditour (Italy)',
                'live_url' => 'https://pompei.auditour.net/',
                'is_featured' => false,
                'completed_at' => '2025-09-01',
                'sort_order' => 40,
            ],
            [
                'slug' => 'auditour',
                'title' => 'Auditour',
                'excerpt' => 'Professional museum & archaeological audioguide platform — iOS/Android apps for cultural institutions.',
                'description' => 'Auditour designs and delivers professional audioguide apps for museums, archaeological sites, and cultural venues. The platform covers editorial planning, studio-recorded narration, and App Store / Google Play publishing.',
                'tech_stack' => ['Laravel', 'Flutter', 'REST API', 'MySQL', 'iOS', 'Android'],
                'role' => 'Full Stack',
                'client' => 'Auditour (Italy)',
                'live_url' => 'https://www.auditour.net/',
                'is_featured' => true,
                'completed_at' => '2025-11-15',
                'sort_order' => 50,
            ],
            [
                'slug' => 'digital-shop-bd',
                'title' => 'Digital Shop BD',
                'excerpt' => 'Bangladesh\'s multi-brand camera & accessories e-commerce — Sony, Canon, DJI, lenses, and creator gear.',
                'description' => 'Digital Shop is a large multi-brand camera and accessories showroom in Bangladesh with online ordering, flash sales, pre-booking, nationwide delivery, and a full catalog of mirrorless cameras, lenses, drones, and filmmaking gear.',
                'tech_stack' => ['Laravel', 'PHP', 'MySQL', 'E-commerce', 'JavaScript'],
                'role' => 'Full Stack',
                'client' => 'Digital Shop BD',
                'live_url' => 'https://www.digitalshopbd.com/',
                'is_featured' => false,
                'completed_at' => '2024-11-30',
                'sort_order' => 60,
            ],
            [
                'slug' => 'jbcpbd',
                'title' => 'JBCPBD',
                'excerpt' => 'ISP website with premium packages, coverage maps, self-care portal, and online bill payment.',
                'description' => 'JBCPBD is an internet service provider platform featuring premium broadband packages, coverage area lookup, package booking, self-care, and quick bill payment for home and corporate customers.',
                'tech_stack' => ['Laravel', 'PHP', 'MySQL', 'JavaScript'],
                'role' => 'Full Stack',
                'client' => 'JBCPBD',
                'live_url' => 'https://jbcpbd.com/',
                'is_featured' => false,
                'completed_at' => '2025-01-18',
                'sort_order' => 70,
            ],
            [
                'slug' => 'delightbd',
                'title' => 'Delightbd',
                'excerpt' => 'High-speed broadband ISP site — pricing plans, coverage, self-care, and customer onboarding.',
                'description' => 'Delightbd delivers a modern ISP web presence with premium internet packages, bufferless streaming features, coverage area tools, self-care login, and online package booking.',
                'tech_stack' => ['Laravel', 'PHP', 'MySQL', 'JavaScript'],
                'role' => 'Full Stack',
                'client' => 'Delightbd',
                'live_url' => 'https://delightbd.com/',
                'is_featured' => false,
                'completed_at' => '2025-02-12',
                'sort_order' => 80,
            ],
            [
                'slug' => 'truck-koi-app',
                'title' => 'Truck Koi — Mobile App',
                'excerpt' => 'Android app for instant truck booking, real-time tracking, and transparent pricing in Bangladesh.',
                'description' => 'The Truck Koi mobile app lets users book trucks in a few taps, track deliveries in real time, and connect with verified drivers — built for fast, affordable goods transport nationwide.',
                'tech_stack' => ['Flutter', 'Dart', 'REST API', 'Android', 'Firebase'],
                'role' => 'Mobile Developer',
                'client' => 'Truck Koi',
                'live_url' => 'https://play.google.com/store/apps/details?id=com.softzen.truckkoiuser',
                'is_featured' => false,
                'completed_at' => '2025-06-01',
                'sort_order' => 90,
            ],
            [
                'slug' => 'mcqmate',
                'title' => 'McqMate',
                'excerpt' => 'MCQ study portal app — organized courses, bookmarks, PDF downloads, and fast search for students.',
                'description' => 'McqMate is an educational platform built by students for students. It offers well-organized MCQs by course and chapter, bookmarking, improved search, and free PDF downloads in a lightweight app.',
                'tech_stack' => ['Flutter', 'Dart', 'REST API', 'Android'],
                'role' => 'Mobile Developer',
                'client' => 'McqMate',
                'live_url' => 'https://play.google.com/store/apps/details?id=com.mcqmate.app',
                'is_featured' => false,
                'completed_at' => '2024-06-20',
                'sort_order' => 100,
            ],
            [
                'slug' => 'bddoctor',
                'title' => 'BDDoctor',
                'excerpt' => 'Healthcare app to find doctors by location and specialty with chamber details and contact info.',
                'description' => 'BDDoctor helps patients discover doctors across Bangladesh by location and specialty, with profiles showing appointment numbers, chamber locations, and the latest doctor listings.',
                'tech_stack' => ['Flutter', 'Dart', 'REST API', 'Android', 'Laravel'],
                'role' => 'Mobile Developer',
                'client' => 'BDDoctor',
                'live_url' => 'https://play.google.com/store/apps/details?id=com.bddoctor.bdboctor',
                'is_featured' => false,
                'completed_at' => '2025-04-08',
                'sort_order' => 110,
            ],
        ];

        $slugs = array_column($rows, 'slug');
        Project::query()->whereNotIn('slug', $slugs)->delete();

        foreach ($rows as $r) {
            Project::query()->updateOrCreate(
                ['slug' => $r['slug']],
                array_merge($r, [
                    'is_featured' => $r['slug'] === 'auditour',
                ]),
            );
        }
    }

    private function seedTimeline(): void
    {
        TimelineItem::query()
            ->where('title', 'Back End Developer')
            ->where('org', 'Intigrad Technologies (Australia)')
            ->delete();

        $items = [
            [
                'type' => 'experience',
                'title' => 'Back End Developer',
                'org' => 'Intigrad Technologies, Australia',
                'employment_type' => 'Part-time',
                'period' => 'Jul 2025 - Present · 1 yr',
                'location' => 'Australia · Remote',
                'desc' => 'Backend web Developer',
                'skills' => 'Back-End Web Development, Server Side Programming, Laravel, REST API',
                'is_published' => true,
                'sort_order' => 10,
            ],
            [
                'type' => 'experience',
                'title' => 'Junior Assistant Teacher (ICT)',
                'org' => 'Ugharia Union Council High School',
                'employment_type' => 'Full-time',
                'period' => 'Jul 2024 - Present · 2 yrs',
                'location' => 'Chandpur District, Chattogram, Bangladesh · On-site',
                'desc' => 'Teaching ICT and supporting classroom learning with practical technology skills.',
                'skills' => 'ICT Education, Classroom Instruction, Computer Fundamentals',
                'is_published' => true,
                'sort_order' => 15,
            ],
            [
                'type' => 'experience',
                'title' => 'Instructor',
                'org' => 'Shahrasti Science and Technology Institute',
                'employment_type' => 'Full-time',
                'period' => 'Jan 2024 - Present · 2 yrs 6 mos',
                'location' => 'Bangladesh · On-site',
                'desc' => 'Teaching and mentoring with a focus on practical skills, structured learning, and real-world examples.',
                'skills' => 'Instruction, Mentoring, Practical Training',
                'is_published' => true,
                'sort_order' => 20,
            ],
            [
                'type' => 'education',
                'title' => 'Diploma in Electrical Engineering (Completed)',
                'org' => 'CCN Polytechnic Institute',
                'employment_type' => null,
                'period' => '2020 — 2024',
                'location' => 'Bangladesh',
                'desc' => 'Completed foundational engineering coursework with practical lab-based learning and project work.',
                'skills' => null,
                'is_published' => true,
                'sort_order' => 30,
            ],
            [
                'type' => 'education',
                'title' => 'BSc in Computer Science',
                'org' => 'University of South Asia',
                'employment_type' => null,
                'period' => 'Ongoing',
                'location' => 'Bangladesh',
                'desc' => 'Studying computer science with focus on software engineering, web technologies, and system design.',
                'skills' => null,
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

