<?php
/* =====================================================================
   SERVICE SCHEMA DATA — GEM Gujarat
   File: includes/service-schema-data.php

   Consumed by includes/schema-engine.php (BLOCK B) to build the
   Service node on each service page. Keyed by PHP filename.

   Per-entry keys:
     id_fragment   string  — appended to the canonical URL as #fragment
     name          string  — Service name (clean, no brand suffix)
     serviceType   string  — the discipline/category, not the page title
     serviceOutput string  — the tangible deliverables a client receives
     description   string  — falls back to $page_desc when omitted
     keywords      string  — comma-separated search terms
     audience      array   — audienceType strings
     areaServed    array   — geographic scope (defaults to India)
   ===================================================================== */

$service_schema_map = [

    /* ── 1. GeM Registration Consultant ────────────────────────────── */
    'gem-registration-consultant.php' => [
        'id_fragment'   => 'gem-seller-registration',
        'name'          => 'GeM Seller Registration & Consultant Services',
        'serviceType'   => 'Government e-Marketplace (GeM) Seller Onboarding & Profile Verification',
        'serviceOutput' => 'GeM Primary User Account, Profile Verification, Aadhaar & PAN Linking, GST & Bank Validation, Udyam MSME Integration, Active Seller Dashboard Setup within 48 Hours',
        'description'   => 'Complete end-to-end GeM registration consultancy for manufacturers, traders, and service providers across India. Fast 48-hour onboarding with document verification, profile setup, and compliance clearance.',
        'keywords'      => 'GeM Registration Consultant, GeM Seller Registration Online, Government e-Marketplace Registration, GeM Portal Sign Up, GeM Vendor Registration, GeM Consultant India, Primary User Creation GeM',
        'audience'      => ['Manufacturers', 'Traders', 'MSMEs', 'Startups', 'Service Providers', 'Government Contractors'],
        'areaServed'    => ['India'],
    ],

    /* ── 2. GeM Catalogue Management Services ────────────────────────── */
    'gem-catalogue-management-services.php' => [
        'id_fragment'   => 'gem-catalogue-management',
        'name'          => 'GeM Catalogue Management Services',
        'serviceType'   => 'E-Marketplace Catalogue Management, Product Listing & Compliance Monitoring',
        'serviceOutput' => 'Optimized Product Listings, Category & Subcategory Mapping, Technical Specifications Formatting, Golden Parameters Setup, Compliance Monitoring, Suppression Prevention & Reactivation',
        'description'   => 'Professional GeM catalogue management services across India. Maximize product visibility, achieve L1 eligibility, prevent listing suppression, and maintain 100% compliance with GeM category standards.',
        'keywords'      => 'GeM Catalogue Management Services, GeM Product Listing, GeM Listing Suppression Fix, GeM Catalogue Upload, Product Visibility Improvement GeM, GeM Listing Consultant, GeM Golden Parameters Setup',
        'audience'      => ['GeM Sellers', 'Manufacturers', 'Distributors', 'OEMs', 'Traders', 'MSMEs'],
        'areaServed'    => ['India'],
    ],

    /* ── 3. GeM Product Catalogue Update ─────────────────────────────── */
    'gem-product-catalogue-update.php' => [
        'id_fragment'   => 'gem-product-catalogue-update',
        'name'          => 'GeM Product Catalogue Update & Listing Optimization',
        'serviceType'   => 'GeM Product Listing Updates, Specification Revisions & Price Adjustments',
        'serviceOutput' => 'Updated Technical Specifications, Dynamic Price Adjustments, Image Replacements, Bulk Catalogue Re-uploads, Category Re-alignment, Disapproved & Rejected Listing Corrections',
        'description'   => 'Fast and compliant GeM product catalogue update services nationwide. Modify existing listings, update technical parameters, adjust pricing for L1 competitiveness, and resolve listing rejections.',
        'keywords'      => 'GeM Product Catalogue Update, GeM Listing Update, GeM Price Update, GeM Product Listing Correction, GeM Catalogue Revision Services, GeM Price Optimization',
        'audience'      => ['Active GeM Sellers', 'Brand Owners', 'Dealers', 'Wholesalers', 'Industrial Suppliers'],
        'areaServed'    => ['India'],
    ],

    /* ── 4. GeM Stock Update Service ─────────────────────────────────── */
    'gem-stock-update-service.php' => [
        'id_fragment'   => 'gem-stock-update',
        'name'          => 'GeM Stock Update & Listing Expiry Prevention Service',
        'serviceType'   => 'GeM Inventory Management, Quantity Synchronization & Listing Renewal',
        'serviceOutput' => 'Real-Time Stock Quantity Updates, Listing Expiry Renewal, De-listing & Removal Prevention, Multi-Location Inventory Sync, Out-of-Stock Risk Management',
        'description'   => 'Prevent product listing deactivation, listing expiry, and missed orders with expert GeM stock update and inventory synchronization services across India. Keep listings live 24/7.',
        'keywords'      => 'GeM Stock Update Service, GeM Listing Expiry Solution, GeM Inventory Management, GeM Stock Renewal, GeM Product Expiry Fix, GeM De-listing Prevention',
        'audience'      => ['E-commerce Sellers on GeM', 'Manufacturers', 'Authorized Resellers', 'Distributors', 'Stockists'],
        'areaServed'    => ['India'],
    ],

    /* ── 5. GeM Invoice Generation & Payment Process ─────────────────── */
    'gem-invoice-generation.php' => [
        'id_fragment'   => 'gem-invoice-generation',
        'name'          => 'GeM Invoice Generation & CRAC Payment Follow-up Service',
        'serviceType'   => 'Government e-Marketplace Invoicing, Billing & Payment Processing Assistance',
        'serviceOutput' => 'GST-Compliant GeM Invoices, CRAC (Consignee Receipt and Acceptance Certificate) Verification, Milestone Billing Uploads, Payment Discrepancy Resolution, Bill Tracking & Follow-up Reports',
        'description'   => 'Expert GeM invoice generation and payment acceleration services. Eliminate billing errors, match CRAC certificates, verify GST compliance, and resolve government buyer payment delays nationwide.',
        'keywords'      => 'GeM Invoice Generation, GeM CRAC Payment, GeM Billing Service, GeM Payment Follow-up, Government Payment Tracking GeM, CRAC Certificate GeM, GeM Payment Delay Solution',
        'audience'      => ['GeM Suppliers', 'Government Contractors', 'MSME Vendors', 'Equipment Suppliers', 'Service Providers'],
        'areaServed'    => ['India'],
    ],

    /* ── 6. GeM Order Acceptance Guide & Support ─────────────────────── */
    'gem-order-acceptance-guide.php' => [
        'id_fragment'   => 'gem-order-acceptance',
        'name'          => 'GeM Order Acceptance & Post-Award Compliance Support',
        'serviceType'   => 'GeM Purchase Order Fulfillment & Contract Compliance Guidance',
        'serviceOutput' => 'Purchase Order (PO) Verification, 10-Day Order Acceptance Compliance, Delivery Schedule Planning, Performance Bank Guarantee (PBG) Advisory, Delivery Challan Preparation, Milestone Compliance Tracking',
        'description'   => 'End-to-end guidance for GeM order acceptance and contract execution. Meet strict 10-day acceptance deadlines, manage PBG submissions, prevent cancellation penalties, and ensure smooth delivery to government consignees.',
        'keywords'      => 'GeM Order Acceptance, GeM Purchase Order Acceptance, GeM Order Fulfillment, GeM 10 Day Order Deadline, GeM PBG Compliance, GeM Delivery Challan, GeM Contract Execution',
        'audience'      => ['GeM Awarded Vendors', 'Contractors', 'Government Suppliers', 'Manufacturers', 'Distributors'],
        'areaServed'    => ['India'],
    ],

    /* ── 7. GeM L1 Comparison Service ────────────────────────────────── */
    'gem-l1-comparison-service.php' => [
        'id_fragment'   => 'gem-l1-comparison',
        'name'          => 'GeM L1 Comparison & Direct Purchase Optimization Service',
        'serviceType'   => 'Rule 149 Direct Purchase & L1 Price Strategy Advisory',
        'serviceOutput' => 'Golden Parameters Optimization, Competitor Price & Specification Audit, L1 Direct Purchase Eligibility Setup, Dynamic Price Benchmarking, Custom Comparison Matrix Reports',
        'description'   => 'Win direct government purchase orders without bidding. Our GeM L1 comparison service optimizes golden parameters and competitive pricing under GFR Rule 149 for instant direct sales.',
        'keywords'      => 'GeM L1 Comparison Service, GeM Rule 149 Direct Purchase, How to Become L1 in GeM, GeM Golden Parameters, GeM Direct Order Strategy, L1 Status GeM, GeM Price Benchmarking',
        'audience'      => ['Manufacturers', 'Authorized Resellers', 'Dealers', 'MSMEs', 'Government Vendors'],
        'areaServed'    => ['India'],
    ],

    /* ── 8. GeM OEM Panel Registration ───────────────────────────────── */
    'gem-oem-panel-registration.php' => [
        'id_fragment'   => 'gem-oem-panel-registration',
        'name'          => 'GeM OEM Panel Registration & Brand Approval Service',
        'serviceType'   => 'Original Equipment Manufacturer (OEM) Dashboard & Brand Authorization',
        'serviceOutput' => 'OEM Panel Creation, Brand Approval on GeM, Trademark Verification, Brand Authorization Code (BAC) Management, Reseller Authorization Control, Vendor Assessment Exemption Filing',
        'description'   => 'Complete GeM OEM panel registration and brand approval consultancy for Indian manufacturers. Gain full control over your brand, authorize resellers, and unlock exclusive OEM tender privileges.',
        'keywords'      => 'GeM OEM Panel Registration, GeM Brand Approval, GeM OEM Dashboard, Brand Authorization Code GeM, GeM Manufacturer Registration, GeM Trademark Approval, GeM BAC Code Management',
        'audience'      => ['Original Equipment Manufacturers (OEMs)', 'Brand Owners', 'Industrial Producers', 'Trademark Holders'],
        'areaServed'    => ['India'],
    ],

    /* ── 9. GeM Tender Bidding Support ───────────────────────────────── */
    'gem-tender-bidding-support.php' => [
        'id_fragment'   => 'gem-tender-bidding',
        'name'          => 'GeM Tender Bidding Support & Bid Submission Service',
        'serviceType'   => 'Public Procurement Tender Management, Technical Bid Preparation & Reverse Auction Support',
        'serviceOutput' => 'Tender Opportunity Matching, Technical Document Preparation, Financial Bid & BOQ Strategy, Bid Submission & Verification, Reverse Auction (RA) Live Assistance, Representation Drafting',
        'description'   => 'Comprehensive GeM tender bidding support across India. We identify high-potential government tenders, prepare bulletproof technical bids, optimize pricing, and provide live reverse auction guidance.',
        'keywords'      => 'GeM Tender Bidding Support, GeM Bid Submission, GeM Tender Consultant India, GeM Reverse Auction Support, Government Tender Bidding Services, BOQ Bidding GeM, GeM Tender Participation',
        'audience'      => ['Government Contractors', 'MSMEs', 'Manufacturers', 'Service Contractors', 'Project Developers'],
        'areaServed'    => ['India'],
    ],

    /* ── 10. GeM Vendor Assessment Support ───────────────────────────── */
    'gem-vendor-assessment-support.php' => [
        'id_fragment'   => 'gem-vendor-assessment',
        'name'          => 'GeM Vendor Assessment & RITES / QCI Audit Support',
        'serviceType'   => 'GeM Vendor Assessment (VA), Factory Audit & Manufacturing Capacity Verification',
        'serviceOutput' => 'Desktop Assessment Documentation, Quality & Safety Manual Prep, Video / Physical Factory Inspection Readiness, RITES / QCI Compliance Checklist, Vendor Assessment Exemption Processing',
        'description'   => 'Pass your GeM Vendor Assessment audit smoothly. Expert assistance for desktop evaluation and physical/video audits by RITES and QCI to secure your official OEM manufacturer badge.',
        'keywords'      => 'GeM Vendor Assessment Support, GeM RITES Audit Consultant, GeM QCI Assessment, GeM Vendor Assessment Exemption, GeM Factory Audit Support, GeM VA Verified Badge',
        'audience'      => ['Manufacturers', 'OEMs', 'Industrial Factories', 'Fabricators', 'Assembly Units'],
        'areaServed'    => ['India'],
    ],

    /* ── 11. GeM MSME & Udyam Registration ───────────────────────────── */
    'gem-msme-udyam-registration.php' => [
        'id_fragment'   => 'gem-msme-udyam-registration',
        'name'          => 'GeM MSME & Udyam Registration Service',
        'serviceType'   => 'MSME Udyam Certification & GeM Portal Benefit Integration',
        'serviceOutput' => 'Official Udyam Registration Certificate, GeM Profile MSME Linking, EMD Exemption Setup, Tender Fee Waiver Activation, 25% Procurement Preference Enablement, Priority Payment Setup',
        'description'   => 'Fast MSME Udyam registration and seamless integration with the GeM portal. Unlock exclusive government tender exemptions, EMD waivers, purchase preferences, and prompt payment protections.',
        'keywords'      => 'GeM MSME Registration, Udyam Registration for GeM, MSME Tender Exemption GeM, GeM EMD Waiver, Udyam Certificate Consultant, GeM Tender Fee Waiver',
        'audience'      => ['Micro, Small and Medium Enterprises (MSMEs)', 'Startups', 'Proprietorships', 'Partnerships', 'Private Limited Companies'],
        'areaServed'    => ['India'],
    ],

    /* ── 12. ISO 9001 Certificate for GeM ────────────────────────────── */
    'gem-iso-certificate-9001.php' => [
        'id_fragment'   => 'gem-iso-certificate',
        'name'          => 'ISO 9001 Certification for GeM Sellers & OEM Registration',
        'serviceType'   => 'ISO Quality Management System (QMS) Certification & GeM Compliance',
        'serviceOutput' => 'Accredited ISO 9001:2015 Quality Management Certificate, Quality Policy & Audit Documentation, GeM OEM Eligibility Fulfillment, Tender Technical Scoring Boost, Verified Certificate Upload',
        'description'   => 'Acquire accredited ISO 9001:2015 certification to boost credibility on GeM, meet mandatory OEM panel requirements, and score higher in government tender technical evaluations.',
        'keywords'      => 'GeM ISO Certificate 9001, ISO 9001 for GeM, ISO Certification Consultant India, GeM OEM ISO Requirement, Quality Management System GeM, GeM ISO Badge',
        'audience'      => ['GeM Sellers', 'OEM Manufacturers', 'Government Contractors', 'Suppliers', 'Service Providers'],
        'areaServed'    => ['India'],
    ],
];
