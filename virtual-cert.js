// =====================================================
// VIRTUAL EXPERIENCE TILES
// Owned here — do not duplicate in index.html
// =====================================================

document.querySelectorAll('.tile').forEach(function(tile) {
    var closeBtn = tile.querySelector('.close-tile');

    tile.querySelector('.tile-front').addEventListener('click', function() {
        tile.classList.add('active');
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            tile.classList.remove('active');
        });
    }
});

// =====================================================
// EXPERIENCE TILES
// Owned here — do not duplicate in index.html
// =====================================================

document.querySelectorAll('.exp-tile').forEach(function(tile) {
    tile.querySelector('.exp-tile-front').addEventListener('click', function() {
        document.querySelectorAll('.exp-tile.flipped').forEach(function(t) {
            if (t !== tile) t.classList.remove('flipped');
        });
        tile.classList.toggle('flipped');
    });

    var closeBtn = tile.querySelector('.exp-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            tile.classList.remove('flipped');
        });
    }
});

// =====================================================
// CERTIFICATION DETAIL POPUP
// Owned here — do not duplicate in index.html
// =====================================================

(function () {

    var certDetailOverlay = document.getElementById('cert-detail-popup');
    var certDetailInner   = document.getElementById('certDetailInner');
    var certDetailClose   = document.getElementById('certDetailClose');

    // =====================================================
    // CERTIFICATE DATA
    // Single source of truth — edit only here
    // =====================================================

    var certData = {

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

        'cert-sql-associate': {
            badgeType: 'badge',
            badgeSrc:  'assets/Associate_Data_Analyst_Badge.png',
            badgeAlt:  'Associate Data Analyst in SQL Badge',
            title:     'Associate Data Analyst in SQL',
            issuer:    'DataCamp',
            modules: [
                'Completed DataCamp\'s Associate Data Analyst in SQL track, covering SQL foundations, PostgreSQL advanced functions and window functions, statistics, exploratory data analysis, data-driven decision making, and data visualization and communication concepts.'
            ],
            asset:     'assets/Associate_Data_Analyst_in_SQL.pdf',
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

    // =====================================================
    // BUILD INLINE VIEWER
    // =====================================================

    function buildInlineViewer(asset, assetType) {
        if (assetType === 'pdf') {
            return '<iframe src="' + asset + '" title="Certificate" class="cdp-inline-iframe"></iframe>';
        }
        return '<img src="' + asset + '" alt="Certificate" class="cdp-inline-img">';
    }

    // =====================================================
    // OPEN CERTIFICATE DETAIL POPUP
    // =====================================================

    function openCertDetail(certId) {
        var d = certData[certId];
        if (!d) return;

        var imgMarkup = d.badgeType === 'badge'
            ? '<div class="cdp-badge-wrap"><img src="' + d.badgeSrc + '" alt="' + d.badgeAlt + '" class="cdp-badge-img"></div>'
            : '<div class="cdp-logo-wrap"><img src="' + d.badgeSrc + '" alt="' + d.badgeAlt + '" class="cdp-logo-img"></div>';

        var moduleLis = d.modules.map(function(m) {
            return '<li><i class="fas fa-check-circle"></i>' + m + '</li>';
        }).join('');

        certDetailInner.innerHTML =
            '<div class="cdp-header">' +
                imgMarkup +
                '<div class="cdp-header-text">' +
                    '<h3>' + d.title + '</h3>' +
                    '<p class="cdp-issuer"><i class="fas fa-building"></i> ' + d.issuer + '</p>' +
                    '<span class="cert-status-badge cert-complete">Completed</span>' +
                '</div>' +
            '</div>' +
            '<ul class="cert-modules cdp-modules">' + moduleLis + '</ul>' +
            '<button class="cert-view-btn cdp-view-btn" data-asset="' + d.asset + '" data-type="' + d.assetType + '" data-open="false" aria-expanded="false">' +
                '<i class="fas fa-file-pdf"></i> View Certificate' +
            '</button>' +
            '<div class="cdp-inline-viewer" id="cdpInlineViewer" aria-live="polite"></div>';

        // =====================================================
        // VIEW / HIDE CERTIFICATE BUTTON
        // =====================================================

        var viewBtn   = certDetailInner.querySelector('.cdp-view-btn');
        var viewerDiv = certDetailInner.querySelector('#cdpInlineViewer');

        viewBtn.addEventListener('click', function() {
            var isOpen = this.getAttribute('data-open') === 'true';

            if (isOpen) {
                viewerDiv.innerHTML = '';
                viewerDiv.classList.remove('cdp-inline-viewer--open');
                this.setAttribute('data-open', 'false');
                this.setAttribute('aria-expanded', 'false');
                this.innerHTML = '<i class="fas fa-file-pdf"></i> View Certificate';
                return;
            }

            viewerDiv.innerHTML = buildInlineViewer(
                this.getAttribute('data-asset'),
                this.getAttribute('data-type')
            );
            viewerDiv.classList.add('cdp-inline-viewer--open');
            this.setAttribute('data-open', 'true');
            this.setAttribute('aria-expanded', 'true');
            this.innerHTML = '<i class="fas fa-chevron-up"></i> Hide Certificate';

            requestAnimationFrame(function() {
                viewerDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
        });

        certDetailOverlay.style.display = 'flex';
    }

    // =====================================================
    // CLOSE DETAIL POPUP
    // =====================================================

    function closeCertDetail() {
        certDetailOverlay.style.display = 'none';
        certDetailInner.innerHTML = '';
    }

    // =====================================================
    // EVENT BINDINGS
    // =====================================================

    certDetailClose.addEventListener('click', closeCertDetail);

    certDetailOverlay.addEventListener('click', function(e) {
        if (e.target === certDetailOverlay) closeCertDetail();
    });

    document.querySelectorAll('.cert-card-tile').forEach(function(tile) {
        tile.addEventListener('click', function() {
            openCertDetail(tile.getAttribute('data-cert'));
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeCertDetail();
    });

})();
