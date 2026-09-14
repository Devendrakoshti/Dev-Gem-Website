<?php
/* =====================================================================
   SERVICE SCHEMA DATA — Tesla Mechanical Designs
   File: includes/service-schema-data.php

   Consumed by includes/schema-engine.php (BLOCK B) to build the
   Service node on each service page. Keyed by PHP filename.

   Per-entry keys:
     id_fragment   string  — appended to the canonical URL as #fragment
     name          string  — Service name (clean, no brand suffix)
     serviceType   string  — the discipline, not the page title
     serviceOutput string  — the deliverables a client actually receives
     description   string  — falls back to $page_desc when omitted
     keywords      string  — comma-separated
     audience      array   — audienceType strings
     areaServed    array   — OPTIONAL override; omit to use the engine default

   Anything omitted falls back to the page-level variable or is dropped
   by _schema_clean(). Do not add a page here unless it is also listed in
   $service_pages inside schema-engine.php.
   ===================================================================== */

$service_schema_map = [

    /* ── Drafting & Documentation ─────────────────────────────────── */
    '2D-mechanical-drawings-services.php' => [
        'id_fragment'   => '2d-mechanical-drawings',
        'name'          => '2D Mechanical Drawing Services',
        'serviceType'   => 'Mechanical Drafting and Technical Documentation',
        'serviceOutput' => 'Fabrication Drawings, Mechanical Part Drawings, Assembly Drawings, GD&T Dimensioned Sheets',
        'description'   => 'Precise 2D mechanical drawings for manufacturing, inspection and documentation, produced to recognised drafting standards.',
        'keywords'      => '2D Mechanical Drawings, 2D Mechanical Drawing Services, Mechanical Drafting Services, Fabrication Drawings, Mechanical Part Drawings, Assembly Drawings',
        'audience'      => ['Manufacturers', 'OEMs', 'Fabricators', 'Mechanical Engineers'],
    ],
    'mechanical-drafting-services.php' => [
        'id_fragment'   => 'mechanical-drafting',
        'name'          => 'Mechanical Drafting Services',
        'serviceType'   => 'Mechanical Drafting and Production Documentation',
        'serviceOutput' => 'Manufacturing Drawings, Fabrication Drawings, Weldment Drawings, General Arrangement Drawings, Sheet Metal Detailing, Bills of Materials',
        'description'   => 'Mechanical drafting services for manufacturers, OEMs and fabricators, covering manufacturing, fabrication, assembly and weldment drawing packages.',
        'keywords'      => 'Mechanical Drafting Services, Manufacturing Drawings, Fabrication Drawings, Assembly Drawings, Weldment Drawings, Sheet Metal Detailing',
        'audience'      => ['Manufacturers', 'OEMs', 'Fabricators', 'Engineering Teams'],
    ],
    'assembly-drawing-services.php' => [
        'id_fragment'   => 'assembly-drawings',
        'name'          => 'Assembly Drawing Services',
        'serviceType'   => 'Assembly and Installation Drawing Preparation',
        'serviceOutput' => 'Detailed Assembly Drawings, Installation Drawings, Exploded Views, Part Callouts, Bills of Materials',
        'description'   => 'Detailed and installation assembly drawings for mechanical products, machinery and multi-trade installations, coordinated for shop floor and field use.',
        'keywords'      => 'Assembly Drawing Services, Detailed Assembly Drawings, Installation Assembly Drawings, Exploded View Drawings, Mechanical Assembly Documentation',
        'audience'      => ['Manufacturers', 'Machine Builders', 'Installation Contractors', 'Fabricators'],
    ],
    'piping-design-and-engineering-services.php' => [
        'id_fragment'   => 'pid-drafting',
        'name'          => 'P&ID Drafting Services',
        'serviceType'   => 'Piping and Instrumentation Diagram Drafting',
        'serviceOutput' => 'P&ID Drawings, As-Built P&ID Updates, Legacy P&ID CAD Conversion, Line and Equipment Schedules',
        'description'   => 'Outsourced P&ID drafting for process plants, skids, utilities and industrial piping, covering new development, as-built updates and CAD conversion.',
        'keywords'      => 'P&ID Drafting Services, P&ID Development and Conversion, Piping and Instrumentation Diagrams, As-Built P&ID Updates, Process Plant Drafting',
        'audience'      => ['Process Engineers', 'Plant Operators', 'EPC Contractors', 'Skid Fabricators'],
    ],
    'cad-conversion-services.php' => [
        'id_fragment'   => 'cad-conversion',
        'name'          => 'CAD Conversion Services',
        'serviceType'   => 'Legacy Drawing and File Format CAD Conversion',
        'serviceOutput' => 'Editable Native CAD Files, Parametric 3D Models, Redrawn 2D Drawings, Neutral Format Exports',
        'description'   => 'Mechanical CAD conversion for manufacturers, OEMs and fabricators, turning PDFs, scans, 2D drawings and legacy CAD files into editable, revisable CAD.',
        'keywords'      => 'CAD Conversion Services, PDF to CAD Conversion, Scan to CAD Conversion, 2D to 3D CAD Conversion, Legacy Drawing Conversion',
        'audience'      => ['Manufacturers', 'OEMs', 'Fabricators', 'Maintenance Engineers'],
    ],

    /* ── 3D Modeling ──────────────────────────────────────────────── */
    '3d-modeling-services.php' => [
        'id_fragment'   => '3d-modeling',
        'name'          => '3D Modeling Services',
        'serviceType'   => '3D CAD Modeling for Manufacturing and Product Development',
        'serviceOutput' => 'Parametric Part Models, Assembly Models, Weldment Models, STEP and Neutral Files, Manufacturing-Ready Geometry',
        'description'   => 'Concepts, sketches, 2D drawings and product requirements converted into accurate, manufacturing-ready 3D CAD models.',
        'keywords'      => '3D Modeling Services, 3D CAD Modeling, 3D Part Modeling, 3D Assembly Modeling, Manufacturing Ready CAD Models',
        'audience'      => ['Manufacturers', 'Product Developers', 'OEMs', 'Industrial Engineers'],
    ],
    'mechanical-part-modelling-services.php' => [
        'id_fragment'   => 'mechanical-part-modeling',
        'name'          => 'Mechanical Part Modeling Services',
        'serviceType'   => 'Mechanical Component 3D CAD Modeling',
        'serviceOutput' => 'Parametric Component Models, Machined Part Models, Replacement Part Geometry, Analysis-Ready Models',
        'description'   => '3D CAD models for individual mechanical components, replacement parts and machined parts, built with precise geometry for analysis, prototyping and production.',
        'keywords'      => 'Mechanical Part Modeling Services, 3D CAD Part Modeling, Mechanical Component Modeling, Machined Part CAD Models, Replacement Part Modeling',
        'audience'      => ['Manufacturers', 'Machine Shops', 'Maintenance Engineers', 'Product Developers'],
    ],
    'assembly-modeling-services.php' => [
        'id_fragment'   => 'assembly-modeling',
        'name'          => 'Assembly Modeling Services',
        'serviceType'   => 'Multi-Component 3D Assembly Modeling',
        'serviceOutput' => 'Assembly Models, Subassembly Structures, Interference and Clearance Reviews, Automated Bills of Materials, Exploded Arrangements',
        'description'   => '3D assembly modeling with verified component fit, part development and automated bills of materials, built for engineering, prototyping and manufacturing handoff.',
        'keywords'      => 'Assembly Modeling Services, 3D Assembly Modeling, Mechanical Assembly Modeling, Interference Checking, Bill of Materials Generation',
        'audience'      => ['Manufacturers', 'Machine Builders', 'Product Developers', 'OEMs'],
    ],
    'product-modeling-services.php' => [
        'id_fragment'   => 'product-modeling',
        'name'          => '3D Product Modeling Services',
        'serviceType'   => 'Product 3D CAD Modeling and Visualisation',
        'serviceOutput' => 'Product CAD Models, Configurable Variants, Visualisation-Ready Geometry, Production Handover Files',
        'description'   => 'Manufacturing-ready 3D product models built for accuracy and brand impact, delivered on a fast turnaround.',
        'keywords'      => '3D Product Modeling Services, Sheet Metal Modeling, Product Modeling and Rendering, Manufacturing Ready Product Models',
        'audience'      => ['Product Developers', 'Manufacturers', 'Marketing Teams', 'Startups'],
    ],
    'sheet-metal-modeling-services.php' => [
        'id_fragment'   => 'sheet-metal-modeling',
        'name'          => 'Sheet Metal Modeling Services',
        'serviceType'   => 'Sheet Metal 3D CAD Modeling',
        'serviceOutput' => 'Sheet Metal Models, Flat Patterns, Bend Drawings, DXF Cutting Files, Hardware Details',
        'description'   => 'Detailed 3D sheet metal models built with bend allowances, material thickness and DFM guidelines applied for reliable fabrication.',
        'keywords'      => 'Sheet Metal Modeling Services, 3D CAD Sheet Metal Modeling, 2D CAD Drafting Services, Flat Pattern Development, Bend Allowance Modeling',
        'audience'      => ['Fabricators', 'Sheet Metal Shops', 'Manufacturers', 'Product Developers'],
    ],
    'furniture-modeling-services.php' => [
        'id_fragment'   => 'furniture-modeling',
        'name'          => 'Furniture Modeling Services',
        'serviceType'   => 'Furniture 3D CAD Modeling for Manufacturing',
        'serviceOutput' => 'Furniture CAD Models, Joinery Details, Hardware Fit Models, 2D Orthographic Views, Production Specifications',
        'description'   => '3D CAD models for wood and metal furniture, including joinery details, hardware fit and production-ready specifications for prototyping, catalogues and manufacturing.',
        'keywords'      => '3D Furniture Modeling Services, Custom Furniture Design, Commercial Furniture Modeling, Furniture CAD Drawings, Joinery Detailing',
        'audience'      => ['Furniture Manufacturers', 'Interior Designers', 'Retail Brands', 'Joinery Workshops'],
    ],

    /* ── Design & Development ─────────────────────────────────────── */
    'product-design-services.php' => [
        'id_fragment'   => 'product-design',
        'name'          => 'Product Design and Development Services',
        'serviceType'   => 'Engineering-Led Product Design and Development',
        'serviceOutput' => 'Concept Layouts, Mechanical Architecture, Detailed CAD Models, DFMEA and DFM Reviews, Production Handover Documentation',
        'description'   => 'End-to-end product design and development for mechanical, electronic, IoT, embedded, industrial, medical and consumer products.',
        'keywords'      => 'Product Design and Development Services, Product Concept Architecture, Mechanical Product Design, Design for Manufacturing, Prototype Development',
        'audience'      => ['Startups', 'Product Developers', 'Manufacturers', 'OEMs'],
    ],
    'product-development-services.php' => [
        'id_fragment'   => 'product-development',
        'name'          => 'Product Development Services',
        'serviceType'   => 'Concept to Manufacturing Product Development',
        'serviceOutput' => 'Requirement Definition, Concept Designs, Engineering Calculations, Detailed CAD and Drawings, Manufacturing Release Packages',
        'description'   => 'End-to-end product development from concept through manufacturing, covering mechanical, electronic, IoT, embedded, medical and consumer product categories.',
        'keywords'      => 'Product Development Company, Mechanical Engineering Product Development, Concept to Manufacturing, New Product Development Services',
        'audience'      => ['Startups', 'Manufacturers', 'OEMs', 'Product Managers'],
    ],
    'industrial-design-services.php' => [
        'id_fragment'   => 'industrial-design',
        'name'          => 'Industrial Design Services',
        'serviceType'   => 'Industrial Design and Product Styling',
        'serviceOutput' => 'Concept Sketches, Mood Boards, Form Studies, Styling Models, Engineering-Integrated 3D CAD',
        'description'   => 'Concept development, product styling and engineering-integrated industrial design for startups and manufacturers, from sketches to production-ready 3D CAD.',
        'keywords'      => 'Industrial Design Services, Product Concept Development, Design for Manufacturing, Product Styling, Consumer Product Design',
        'audience'      => ['Startups', 'Consumer Product Brands', 'Medical Device Companies', 'Manufacturers'],
    ],
    'machine-design-services.php' => [
        'id_fragment'   => 'machine-design',
        'name'          => 'Machine Design Services',
        'serviceType'   => 'Custom Industrial Machine Design and Engineering',
        'serviceOutput' => 'Machine Architecture, Mechanism Designs, Frame and Structure Models, Shop-Floor Detailing, Production Release Documentation',
        'description'   => 'Engineering-led machine design for OEMs, automation companies, manufacturers, fabrication businesses and industrial startups.',
        'keywords'      => 'Machine Design Services, Custom Machine Engineering, Machine Assembly Design, Industrial Automation Design, Special Purpose Machines',
        'audience'      => ['OEMs', 'Automation Companies', 'Manufacturers', 'Industrial Startups'],
    ],
    'enclosure-design-services.php' => [
        'id_fragment'   => 'enclosure-design',
        'name'          => 'Enclosure Design Services',
        'serviceType'   => 'Sheet Metal and Plastic Enclosure Design',
        'serviceOutput' => 'Enclosure CAD Models, Panel Layouts, Sealing and Thermal Details, Flat Patterns, Fabrication Drawings',
        'description'   => 'Custom enclosure design for electronics housings, control panels, medical instrument casings and industrial equipment, engineered for function and manufacturability.',
        'keywords'      => 'Enclosure Design Services, Sheet Metal Enclosure Design, Electrical Enclosure Design, Control Panel Design, Electronics Housing Design',
        'audience'      => ['Electronics Manufacturers', 'Medical Device Companies', 'Industrial Equipment OEMs', 'Panel Builders'],
    ],
    'sheet-metal-design-services.php' => [
        'id_fragment'   => 'sheet-metal-design',
        'name'          => 'Sheet Metal Design Services',
        'serviceType'   => 'Sheet Metal Design and Design for Manufacture',
        'serviceOutput' => 'Sheet Metal CAD Models, Flat Patterns, DXF Files, Bend Allowance Calculations, DFM and DFA Reviews, Production Drawings',
        'description'   => 'Sheet metal design services covering enclosures, brackets, cabinets, flat patterns, DXF files, DFM and DFA, bend allowances and production release.',
        'keywords'      => 'Sheet Metal Design Services, Sheet Metal Enclosure Design, Custom Sheet Metal Design, Flat Pattern Development, DFM for Sheet Metal',
        'audience'      => ['Fabricators', 'Product Developers', 'OEMs', 'Sheet Metal Shops'],
    ],
    'fabrication-design-services.php' => [
        'id_fragment'   => 'fabrication-design',
        'name'          => 'Fabrication Design Services',
        'serviceType'   => 'Weldment and Fabricated Structure Design',
        'serviceOutput' => 'Fabrication CAD Models, Shop Drawings, Weldment Drawings, DXF Files, Bills of Materials, Manufacturing Release Packages',
        'description'   => 'Fabrication design services producing CAD models, shop drawings, weldment drawings, DXF files, BOMs and manufacturing-ready documentation.',
        'keywords'      => 'Fabrication Design Services, Weldment Design Services, Fabrication Drawings, Shop Drawings, Structural Fabrication CAD',
        'audience'      => ['Fabricators', 'Steel Fabrication Shops', 'Equipment Manufacturers', 'Machine Builders'],
    ],

    /* ── Engineering Analysis ─────────────────────────────────────── */
    'engineering-analysis-services.php' => [
        'id_fragment'   => 'engineering-analysis',
        'name'          => 'Engineering Analysis Services',
        'serviceType'   => 'Structural, Thermal and Mechanical Simulation',
        'serviceOutput' => 'Analysis Reports, Documented Assumptions and Boundary Conditions, Result Plots, Design Recommendations',
        'description'   => 'Engineering analysis services including FEA, CFD, structural, thermal and mechanical simulation support for manufacturers, OEMs and product teams.',
        'keywords'      => 'Engineering Analysis Services, Finite Element Analysis Services, FEA Analysis, CFD Analysis, Structural Analysis, Thermal Analysis',
        'audience'      => ['Manufacturers', 'OEMs', 'Design Engineers', 'Product Teams'],
    ],
    'finite-element-analysis.php' => [
        'id_fragment'   => 'finite-element-analysis',
        'name'          => 'Finite Element Analysis Services',
        'serviceType'   => 'Finite Element Analysis and Structural Validation',
        'serviceOutput' => 'FEA Reports, Stress and Deflection Plots, Buckling and Modal Results, Fatigue Assessments, Design Revision Guidance',
        'description'   => 'Finite Element Analysis for structural, stress, fatigue, buckling, modal, thermal and mechanical design validation projects.',
        'keywords'      => 'Finite Element Analysis Services, FEA Analysis Company, Structural Stress Analysis, Fatigue Analysis, Buckling Analysis, Modal Analysis',
        'audience'      => ['Design Engineers', 'Manufacturers', 'OEMs', 'Structural Engineers'],
    ],
    'computational-fluid-dynamics.php' => [
        'id_fragment'   => 'cfd-analysis',
        'name'          => 'CFD Analysis Services',
        'serviceType'   => 'Computational Fluid Dynamics Simulation',
        'serviceOutput' => 'CFD Reports, Flow and Pressure Plots, Thermal Maps, Boundary Condition Records, Engineering Recommendations',
        'description'   => 'CFD analysis services for airflow, heat transfer, pressure drop and thermal management, delivering practical engineering insight for design decisions.',
        'keywords'      => 'CFD Analysis Services, Computational Fluid Dynamics Services, Thermal Analysis, Airflow Simulation, Heat Transfer Analysis',
        'audience'      => ['Design Engineers', 'Equipment Manufacturers', 'Thermal Engineers', 'OEMs'],
    ],

    /* ── Existing Products & Physical Validation ──────────────────── */
    'reverse-engineering-services.php' => [
        'id_fragment'   => 'reverse-engineering',
        'name'          => 'Reverse Engineering Services',
        'serviceType'   => 'Reverse Engineering and Design Data Reconstruction',
        'serviceOutput' => 'Parametric CAD Models, Reconstructed Assemblies, 2D Manufacturing Drawings, GD&T, Bills of Materials',
        'description'   => 'Reverse engineering for obsolete parts, industrial equipment, fabricated assemblies, sheet metal products and mechanical components, producing manufacturing-ready CAD and documentation.',
        'keywords'      => 'Reverse Engineering Services, Scan to CAD Conversion, 3D CAD Model Reconstruction, Obsolete Part Recreation, Legacy Equipment Engineering',
        'audience'      => ['Manufacturers', 'Maintenance Engineers', 'Plant Operators', 'Fabricators'],
    ],
    'scan-to-cad-modeling-services.php' => [
        'id_fragment'   => 'scan-to-cad',
        'name'          => 'Scan to CAD Modeling Services',
        'serviceType'   => 'Point Cloud and Mesh to CAD Conversion',
        'serviceOutput' => 'Editable Parametric CAD Models, Surface Models, Deviation Reports, Manufacturing Drawings',
        'description'   => '3D scans, point clouds and mesh data converted into accurate, editable, manufacturing-ready CAD models.',
        'keywords'      => 'Scan to CAD Modeling Services, Point Cloud to CAD Conversion, STL to CAD Conversion, Mesh to Solid Modeling, 3D Scan Data Processing',
        'audience'      => ['Manufacturers', 'Maintenance Engineers', 'Reverse Engineering Teams', 'Metrology Providers'],
    ],
    'rapid-prototyping-services.php' => [
        'id_fragment'   => 'rapid-prototyping',
        'name'          => 'Rapid Prototyping Services',
        'serviceType'   => 'Prototype Development for Product Testing and Validation',
        'serviceOutput' => 'Physical Prototypes, 3D Printed Parts, Vacuum Cast Parts, Machined Prototypes, Sheet Metal Prototypes',
        'description'   => 'Rapid prototyping using 3D printing, vacuum casting, sheet metal and machined parts, with in-house design-to-manufacture support.',
        'keywords'      => 'Rapid Prototyping Services, CNC Machining Prototypes, Additive Manufacturing Services, Vacuum Casting, Functional Prototypes',
        'audience'      => ['Product Developers', 'Startups', 'Manufacturers', 'Design Engineers'],
    ],
    '3d-printing-services.php' => [
        'id_fragment'   => '3d-printing',
        'name'          => '3D Printing Services',
        'serviceType'   => 'SLA and FDM Additive Manufacturing',
        'serviceOutput' => 'SLA Printed Parts, FDM Printed Parts, Post-Processed Components, Functional Test Parts',
        'description'   => 'In-house SLA and FDM 3D printing turning digital designs into precise physical parts, with fast turnaround and expert post-processing.',
        'keywords'      => '3D Printing Services, SLA 3D Printing, FDM 3D Printing, Rapid Prototyping Services, Additive Manufacturing',
        'audience'      => ['Product Developers', 'Startups', 'Manufacturers', 'Design Engineers'],
    ],

    /* ── Visualisation & Manufacturing ────────────────────────────── */
    'product-rendering-services.php' => [
        'id_fragment'   => 'product-rendering',
        'name'          => 'Product Rendering Services',
        'serviceType'   => 'Photorealistic 3D Product Visualisation',
        'serviceOutput' => 'Photorealistic Renderings, 360 Degree Views, Product Animations, Marketing-Ready Visuals',
        'description'   => 'High-quality 3D product renderings for marketing, presentations and design reviews, showing a product realistically before it is built.',
        'keywords'      => '3D Rendering Services, Product Rendering and Animation, Photorealistic CGI Rendering, 3D Product Visualisation',
        'audience'      => ['Marketing Teams', 'Product Brands', 'Startups', 'Manufacturers'],
    ],
    'manufacturing-services.php' => [
        'id_fragment'   => 'manufacturing',
        'name'          => 'Custom Manufacturing Services',
        'serviceType'   => 'Sheet Metal Fabrication and Mechanical Part Manufacturing',
        'serviceOutput' => 'Laser Cut Parts, Formed and Bent Components, Welded Assemblies, Stamped Parts, Finished Assemblies',
        'description'   => 'ISO 9001:2015 certified manufacturing including laser cutting, bending, welding, stamping and assembly.',
        'keywords'      => 'Manufacturing Services, CNC Machining Services, Sheet Metal Fabrication, Investment Casting, Laser Cutting, Welding Services',
        'audience'      => ['OEMs', 'Manufacturers', 'Equipment Builders', 'Procurement Teams'],
    ],
];
