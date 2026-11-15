
/* ==========================================
   AJFOLIO - CERTIFICATES JAVASCRIPT
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ======================================
       CERTIFICATE INFORMATION
    ====================================== */

    const certificates = [

        {
            title: "AICTE ATAL Faculty Development Program",

            description:
                "Advances in AI: Applications and Ethical Dimensions in Intelligent Systems and Digital Security.",

            issuer:
                "AICTE Training and Learning (ATAL) Academy · Nirmala College",

            category: "Technical Training",

            date: "15 Sep – 20 Sep 2025",

            id: "ATAL/2025/1757603109",

            image: "Assets/images/aicte.jpg",

            file: "Assets/documents/AICTE TRAINING AND LEARNING CERTIFICATE.pdf"
        },

        {
            title: "Programming in Java",

            description:
                "Successfully completed the NPTEL course in Programming in Java.",

            issuer: "NPTEL",

            category: "Technical Courses",

            date: "Jul – Oct 2024",

            id: "NPTEL24CS105S559900067",

            image: "Assets/images/java.jpg",

            file: "Assets/documents/Programming in Java---NPTEL.pdf"
        },

        {
            title: "Cloud Computing",

            description:
                "Successfully completed the NPTEL course in Cloud Computing.",

            issuer: "NPTEL",

            category: "Technical Courses",

            date: "Jul – Oct 2026",

            id: "NPTEL26CS150S558500117",

            image: "Assets/images/cloud.jpg",

            file: "Assets/documents/cloud computing NPTEL ceritificate.pdf"
        },

        {
            title: "Introduction to SQL",

            description:
                "Completed the Introduction to SQL certification course.",

            issuer: "Simplilearn SkillUp",

            category: "Technical Courses",

            date: "28 Oct 2026",

            id: "10959509",

            image: "Assets/images/sql.jpg",

            file: "Assets/documents/Introduction to SQL.pdf"
        },

        {
            title: "How to Get Your Dream Job",

            description:
                "Participated in a career guidance workshop focused on professional development and job opportunities.",

            issuer:
                "Santhigiri College of Computer Sciences · IPSR Solutions Limited",

            category: "Workshops & Webinars",

            date: "19 Mar 2025",

            id: "76891C10E7",

            image: "Assets/images/dream-job.jpg",

            file: "Assets/documents/ipsr solutions ltd participation certificate.pdf"
        },

        {
            title: "TechXpand Career Webinar",

            description:
                "Exploring IT Job Opportunities for All.",

            issuer: "IPSR Solutions Limited",

            category: "Workshops & Webinars",

            date: "10 May 2025",

            id: "riAK5m5om9",

            image: "Assets/images/techxpand.jpg",

            file: "Assets/documents/TechXpand Career Webinar ipsr - particiaption certificate.pdf"
        }

    ];

    /* ======================================
       HTML ELEMENTS
    ====================================== */

    const certGrid = document.getElementById("certGrid");

    const yearElement = document.getElementById("year");

    /* ======================================
       ESCAPE HTML
    ====================================== */

    function escapeHTML(value) {

        return String(value ?? "").replace(/[&<>"']/g, function (char) {

            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }[char];

        });

    }

    /* ======================================
       GENERATE CERTIFICATE CARDS
    ====================================== */

    function displayCertificates() {

        if (!certGrid) return;

        certGrid.innerHTML = "";

        certificates.forEach(function (cert, index) {

            const card = document.createElement("article");

            card.className = "cert-card";

            card.style.animationDelay = `${index * 0.12}s`;

            card.innerHTML = `

                <!-- CERTIFICATE IMAGE -->

                <div class="cert-preview">

                    <img
                        src="${escapeHTML(cert.image)}"
                        alt="${escapeHTML(cert.title)} certificate"
                        class="cert-image"
                        loading="lazy">

                    <span class="cert-status">
                        COMPLETED
                    </span>

                </div>

                <!-- CERTIFICATE INFORMATION -->

                <div class="cert-body">

                    <span class="cert-category">
                        ${escapeHTML(cert.category)}
                    </span>

                    <h3>
                        ${escapeHTML(cert.title)}
                    </h3>

                    <p class="cert-description">
                        ${escapeHTML(cert.description)}
                    </p>

                    <p class="cert-issuer">
                        <strong>Issued by:</strong><br>
                        ${escapeHTML(cert.issuer)}
                    </p>

                    <!-- CERTIFICATE DETAILS -->

                    <div class="cert-details">

                        <div class="cert-detail-row">

                            <span class="cert-detail-label">
                                Completion Date
                            </span>

                            <span class="cert-detail-value">
                                ${escapeHTML(cert.date)}
                            </span>

                        </div>

                        <div class="cert-detail-row">

                            <span class="cert-detail-label">
                                Certificate ID
                            </span>

                            <span class="cert-detail-value">
                                ${escapeHTML(cert.id)}
                            </span>

                        </div>

                        <div class="cert-detail-row">

                            <span class="cert-detail-label">
                                Status
                            </span>

                            <span class="cert-detail-value">
                                ✓ Successfully Completed
                            </span>

                        </div>

                    </div>

                    <!-- VIEW AND DOWNLOAD -->

                    <div class="cert-actions">

                        <a
                            href="${escapeHTML(cert.file)}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="cert-btn">

                            👁 View Certificate

                        </a>

                        <a
                            href="${escapeHTML(cert.file)}"
                            download
                            class="cert-btn download">

                            ↓ Download PDF

                        </a>

                    </div>

                </div>

            `;

            certGrid.appendChild(card);

        });

    }

    /* ======================================
       FOOTER YEAR
    ====================================== */

    if (yearElement) {

        yearElement.textContent = new Date().getFullYear();

    }

    /* ======================================
       INITIALIZE
    ====================================== */

    displayCertificates();

});
