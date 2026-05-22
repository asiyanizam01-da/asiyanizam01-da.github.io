// --- Virtual Experience Tile Click ---
const tiles = document.querySelectorAll('.tile');
tiles.forEach(tile => {
    const closeBtn = tile.querySelector('.close-tile');
    tile.addEventListener('click', () => {
        tile.classList.add('active');
    });
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        tile.classList.remove('active');
    });
});

// --- Certifications Toggle ---
const certToggles = document.querySelectorAll('.toggle-cert');
certToggles.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.closest('.cert-category');
        category.classList.toggle('active');
        btn.textContent = category.classList.contains('active') ? '-' : '+';
    });
});

// --- Cert Detail Popup: inline certificate viewer ---
// Replaces the old double-popup approach.
// "View Certificate" now expands the PDF/image inline inside the detail modal.

(function () {

    const certDetailOverlay = document.getElementById('cert-detail-popup');
    const certDetailInner   = document.getElementById('certDetailInner');
    const certDetailClose   = document.getElementById('certDetailClose');

    // ── Cert data ──────────────────────────────────────────────────────────────
    const certData = {
        'cert-pl300': {
            badgeType: 'badge',
            badgeSrc:  'assets/microsoft-certified-associate-badge.svg',
            badgeAlt:  'Microsoft PL-300 Badge',
            title:     'Power BI Data Analyst Associate (PL-300)',
            issuer:    'Microsoft',
            modules: [
                'Earned Microsoft Certified: Power BI Data Analyst Associate (PL-300)',
                'Covers data preparation, modeling, visualisation, analysis, and deployment in Power BI',
                'Demonstrates proficiency in designing scalable data models and creating business-ready reports'
            ],
            asset:     'assets/Certificate_Microsoft_Certified_PowerBI_Data_Analyst.pdf',
            assetType: 'pdf'
        },
        'cert-google': {
            badgeType: 'badge',
            badgeSrc:  'assets/google_data_analytics_badge.png',
            badgeAlt:  'Google Badge',
            title:     'Google Data Analytics Professional Certificate',
            issuer:    'Google · Coursera',
            modules: [
                'Foundations: Data, Data, Everywhere',
                'Ask Questions to Make Data-Driven Decisions',
                'Prepare Data for Exploration',
                'Process Data from Dirty to Clean',
                'Analyse Data to Answer Questions',
                'Share Data Through the Art of Visualisation',
                'Introduction to Data Analysis using Python',
                'Google Data Analytics Capstone: Complete a Case Study'
            ],
            asset:     'assets/Google_Data_Analytics_Certificate.pdf',
            assetType: 'pdf'
        },
        'cert-powerbi': {
            badgeType: 'badge',
            badgeSrc:  'assets/Data_Analyst_in_PowerBI_Badge.png',
            badgeAlt:  'Power BI Badge',
            title:     'Data Analyst in Power BI',
            issuer:    'DataCamp',
            modules: [
                'Introduction to Power BI',
                'Introduction to DAX in Power BI',
                'Data Visualisation in Power BI',
                'Data Preparation & Transformation in Power BI',
                'Data Modeling in Power BI',
                'DAX Functions in Power BI',
                'Exploratory Data Analysis & Trend Analysis',
                'Reports Design in Power BI',
                'Data Connections & Deploying Assets',
                'Case Study 1 & Case Study 2'
            ],
            asset:     'assets/Data_Analyst_in_PowerBI.pdf',
            assetType: 'pdf'
        },
        'cert-sql': {
            badgeType: 'badge',
            badgeSrc:  'assets/SQL_Fundamentals_Badge.png',
            badgeAlt:  'SQL Fundamentals Badge',
            title:     'SQL Fundamentals',
            issuer:    'DataCamp',
            modules: [
                'Completed DataCamp SQL Fundamentals skill track covering querying, filtering, aggregation, joins, subqueries, and database design'
            ],
            asset:     'assets/SQL_Fundamentals.pdf',
            assetType: 'pdf'
        },
        'cert-hackerrank': {
            badgeType: 'badge',
            badgeSrc:  'assets/SQL_Gold_Badge.png',
            badgeAlt:  'HackerRank SQL Gold Badge',
            title:     'Intermediate SQL Certification',
            issuer:    'HackerRank',
            modules: [
                'Earned HackerRank Intermediate SQL Certification demonstrating proficiency in complex queries, window functions, and advanced SQL problem-solving'
            ],
            asset:     'assets/sql_intermediate certificate.pdf',
            assetType: 'pdf'
        },
        'cert-ibm': {
            badgeType: 'badge',
            badgeSrc:  'assets/IBM_Data_Science_Methodology_Badge.png',
            badgeAlt:  'IBM Badge',
            title:     'Data Science Methodology',
            issuer:    'IBM · Coursera',
            modules: [
                'Completed IBM Data Science Methodology course covering structured approaches to solving data science problems from business understanding through deployment'
            ],
            asset:     'assets/IBM_Data_Science_Methodology.pdf',
            assetType: 'pdf'
        },
        'cert-alteryx': {
            badgeType: 'logo',
            badgeSrc:  'assets/alteryx.png',
            badgeAlt:  'Alteryx',
            title:     'Alteryx Essentials Certification',
            issuer:    'Alteryx',
            modules: [
                'Completed Alteryx Essentials certification covering core data preparation and blending workflows'
            ],
            asset:     'assets/Alteryx_Essentials_Certificate.pdf',
            assetType: 'pdf'
        },
        'cert-databricks': {
            badgeType: 'logo',
            badgeSrc:  'assets/databricks.png',
            badgeAlt:  'Databricks',
            title:     'Databricks Fundamentals Accreditation',
            issuer:    'Databricks',
            modules: [
                'Completed Databricks Fundamentals Accreditation covering the Lakehouse Platform and core data engineering concepts'
            ],
            asset:     'assets/Databricks_Fundamentals_Certificate.pdf',
            assetType: 'pdf'
        },
        'cert-microsoft': {
            badgeType: 'logo',
            badgeSrc:  'assets/microsoft.png',
            badgeAlt:  'Microsoft',
            title:     'Career Essentials in Generative AI',
            issuer:    'Microsoft & LinkedIn Learning',
            modules: [
                'Completed Microsoft & LinkedIn Learning course on Generative AI essentials'
            ],
            asset:     'assets/CertificateOfCompletion_What Is Generative AI.pdf',
            assetType: 'pdf'
        }
    };

    // ── Helpers ────────────────────────────────────────────────────────────────

    function buildInlineViewer(asset, assetType) {
        if (assetType === 'pdf') {
            return `<iframe
                src="${asset}"
                title="Certificate"
                class="cdp-inline-iframe"
            ></iframe>`;
        }
        return `<img src="${asset}" alt="Certificate" class="cdp-inline-img">`;
    }

    function openCertDetail(certId) {
        const d = certData[certId];
        if (!d) return;

        const imgMarkup = d.badgeType === 'badge'
            ? `<div class="cdp-badge-wrap">
                   <img src="${d.badgeSrc}" alt="${d.badgeAlt}" class="cdp-badge-img">
               </div>`
            : `<div class="cdp-logo-wrap">
                   <img src="${d.badgeSrc}" alt="${d.badgeAlt}" class="cdp-logo-img">
               </div>`;

        const moduleLis = d.modules
            .map(m => `<li><i class="fas fa-check-circle"></i>${m}</li>`)
            .join('');

        certDetailInner.innerHTML = `
            <div class="cdp-header">
                ${imgMarkup}
                <div class="cdp-header-text">
                    <h3>${d.title}</h3>
                    <p class="cdp-issuer"><i class="fas fa-building"></i> ${d.issuer}</p>
                    <span class="cert-status-badge cert-complete">Completed</span>
                </div>
            </div>

            <ul class="cert-modules cdp-modules">${moduleLis}</ul>

            <button
                class="cert-view-btn cdp-view-btn"
                data-asset="${d.asset}"
                data-type="${d.assetType}"
                data-open="false"
                aria-expanded="false"
            >
                <i class="fas fa-file-pdf"></i> View Certificate
            </button>

            <div class="cdp-inline-viewer" id="cdpInlineViewer" aria-live="polite"></div>
        `;

        // Bind the toggle button
        const viewBtn    = certDetailInner.querySelector('.cdp-view-btn');
        const viewerDiv  = certDetailInner.querySelector('#cdpInlineViewer');

        viewBtn.addEventListener('click', function () {
            const isOpen = this.getAttribute('data-open') === 'true';

            if (isOpen) {
                // Collapse
                viewerDiv.innerHTML = '';
                viewerDiv.classList.remove('cdp-inline-viewer--open');
                this.setAttribute('data-open', 'false');
                this.setAttribute('aria-expanded', 'false');
                this.innerHTML = '<i class="fas fa-file-pdf"></i> View Certificate';
            } else {
                // Expand
                viewerDiv.innerHTML = buildInlineViewer(
                    this.getAttribute('data-asset'),
                    this.getAttribute('data-type')
                );
                viewerDiv.classList.add('cdp-inline-viewer--open');
                this.setAttribute('data-open', 'true');
                this.setAttribute('aria-expanded', 'true');
                this.innerHTML = '<i class="fas fa-chevron-up"></i> Hide Certificate';

                // Smooth scroll the viewer into the modal's visible area
                requestAnimationFrame(() => {
                    viewerDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                });
            }
        });

        certDetailOverlay.style.display = 'flex';
    }

    function closeCertDetail() {
        certDetailOverlay.style.display = 'none';
        // Wipe content so iframe stops loading when closed
        certDetailInner.innerHTML = '';
    }

    // ── Event bindings ─────────────────────────────────────────────────────────

    certDetailClose.addEventListener('click', closeCertDetail);

    certDetailOverlay.addEventListener('click', e => {
        if (e.target === certDetailOverlay) closeCertDetail();
    });

    document.querySelectorAll('.cert-card-tile').forEach(tile => {
        tile.addEventListener('click', () => openCertDetail(tile.getAttribute('data-cert')));
    });

    // Escape key closes detail popup (file popup no longer exists as separate overlay)
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeCertDetail();
    });

})();
