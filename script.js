document.addEventListener('DOMContentLoaded', () => {
    // --- DATA --- 
    const userData = {
        name: "İLKANƏ <span class='highlight'>QASIMOVA</span>",
        title: "STUDENT",
        contact: [
            { icon: "phone.png", text: "+994 051 541 51 87" },
            { icon: "email.png", text: "ilkoshqasimovaa@gmail.com" },
            { icon: "location.png", text: "Bakı, Binəqədi rayonu,Mircelal kucesi" }
        ],
        socialMedia: [
        ],
        education: [
            { period: "2024 - 2025", school: "Azərbaycan Texniki Universiteti - İnformasiya Təhlükəsizliyi" }
        ],
        skills: ["Python", "HTML, CSS"],
        languages: ["Azərbaycan - Çox yaxşı", "English - Pre-intermediate", "Türk - Çox yaxşı"],
        profile: "Məsuliyyətli, öyrənməyə açıq və texnologiyaya böyük maraq göstərən bir tələbəyəm. İT sahəsində biliklərimi daima inkişaf etdirməyə çalışıram. Komanda ilə işləməkdə çevik, yeni bilikləri tez mənimsəyən və problemlərin həllinə analitik yanaşan biriyəm. Gələcək karyeramda informasiya təhlükəsizliyi sahəsində peşəkar olmaq əsas məqsədimdir.",
        workExperience: [
            {
                title: "",
                details: ["Praktikaya gediləcək"]
            }
        ],
        reference: "Səma və mən müxtəlif platformalarda 30-dan çox video layihə üzərində işləmişik. O, mənim etibarlılığım, yaradıcı iş axınım və yüksək keyfiyyətli işi vaxtında çatdırmaq bacarığım haqqında məlumat verə bilər.",
        certifications: [
            {
                name: "Google Kibertəhlükəsizlik Peşəkar Sertifikatı",
                description: "Bu peşəkar səviyyəli sertifikata şəbəkə, əməliyyat sistemləri, sistem administrasiyası, insidentlərə reaksiya və təhlükəsizlik alətləri üzrə təlimlər daxildir. O, həmçinin kibertəhlükələrin müəyyən edilməsi və azaldılması, SIEM alətlərindən istifadə və təhlükəsizlik qeydlərinin təhlili üzrə praktiki laboratoriyaları əhatə edib."
            }
        ],
        projects: [
            {
                name: "CyberAware: Fişinq Simulyasiya Aləti",
                description: "Təşkilatlara təhlükəsiz mühitdə işçilərin məlumatlılığını sınamağa imkan verən təhsil məqsədləri üçün Python əsaslı fişinq simulyasiya aləti hazırlayıb. Hər bir test mərhələsi üçün ətraflı hesabatlar hazırlanmışdır."
            }
        ],
    };

    // --- ADD DATA TO PAGE ---
    document.getElementById('userName').innerHTML = userData.name;
    document.getElementById('userTitle').textContent = userData.title;

    const createList = (array, iconPath = "") => {
        return array.map(item => 
            `<p class="editable" contenteditable="false"><img src="photos/${iconPath}${item.icon || ''}" alt="" class="icon"> ${item.text}</p>`
        ).join('');
    };

    const createEducation = (array) => {
        return array.map(item => `<p><strong>${item.period}</strong><br>${item.school}</p>`).join('');
    };

    const createSkills = (array) => {
        return `<ul style="list-style-type: none;">${array.map(skill => `<li>${skill}</li>`).join('')}</ul>`;
    };

    const createWork = (array) => {
        return array.map(job => `
            <p><strong>${job.title}</strong></p>
            <ul style="list-style-type: none;">${job.details.map(d => `<li>${d}</li>`).join('')}</ul>
        `).join('');
    };

    const createCertifications = (array) => {
        return array.map(cert => `
            <p><strong>${cert.name}</strong></p>
            <p>${cert.description}</p>
        `).join('');
    };

    const createProjects = (array) => {
        return array.map(project => `
            <p><strong>${project.name}</strong></p>
            <p>${project.description}</p>
        `).join('');
    };

    document.getElementById('contactInfo').innerHTML = createList(userData.contact);
    document.getElementById('socialMedia').innerHTML = createList(userData.socialMedia);
    document.getElementById('educationInfo').innerHTML = createEducation(userData.education);
    document.getElementById('skillsInfo').innerHTML = createSkills(userData.skills);
    document.getElementById('languagesInfo').innerHTML = createSkills(userData.languages);
    document.getElementById('profileInfo').innerHTML = `<p>${userData.profile}</p>`;
    document.getElementById('workExperience').innerHTML = createWork(userData.workExperience);
    document.getElementById('referenceInfo').innerHTML = `<p>${userData.reference}</p>`;
    document.getElementById('certificationsInfo').innerHTML = createCertifications(userData.certifications);
    document.getElementById('projectsInfo').innerHTML = createProjects(userData.projects);

    // --- OLD FUNCTIONS (Edit, Save, Accordion, Zip) ---
    const editBtn = document.getElementById('editBtn');
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    let isEditing = false;

    // Accordion open/close
    accordionBtns.forEach(button => {
        button.addEventListener('click', () => {
            const panel = button.nextElementSibling;
            if (panel.classList.contains('active')) {
                panel.style.maxHeight = null;
                panel.classList.remove('active');
            } else {
                panel.classList.add('active');
                panel.style.maxHeight = "300px";
            }
        });
    });

    // Toggle edit mode
    editBtn.addEventListener('click', () => {
        isEditing = !isEditing;
        editBtn.textContent = isEditing ? 'Save' : 'Edit';

        // Open Accordion panels
        accordionBtns.forEach(btn => {
            const panel = btn.nextElementSibling;
            panel.classList.add('active');
            panel.style.maxHeight = "300px";
        });

        // Activate all editable fields
        const editableElements = document.querySelectorAll('h1, h3, .accordion-panel p, .accordion-panel li, .accordion-panel .editable');
        editableElements.forEach(el => {
            el.setAttribute('contenteditable', isEditing);
        });

        // Save
        if (!isEditing) {
            downloadFiles();
        }
    });

    // Add a new line on Enter key
    const panels = document.querySelectorAll('.accordion-panel');
    panels.forEach(panel => {
        panel.addEventListener('keydown', e => {
            if (!isEditing) return;
            if (e.key === 'Enter') {
                e.preventDefault();
                document.execCommand('insertHTML', false, '<br><br>');
            }
        });
    });

    // Download the page as ZIP
    async function downloadFiles() {
        const zip = new JSZip();

        // Add HTML file
        const html = document.documentElement.outerHTML;
        zip.file("index.html", html);

        // Add CSS file
        const cssPath = Array.from(document.styleSheets).find(s => s.href && s.href.endsWith("style.css"))?.href;
        if (cssPath) {
            try {
                const response = await fetch(cssPath);
                const cssText = await response.text();
                zip.file("style.css", cssText);
            } catch (err) {
                console.warn("CSS dosyası alınamadı:", err);
            }
        }

        // Add script file
        const scriptPath = Array.from(document.scripts).find(s => s.src && s.src.endsWith("script.js"))?.src;
        if (scriptPath) {
            try {
                const response = await fetch(scriptPath);
                const scriptText = await response.text();
                zip.file("script.js", scriptText);
            } catch (err) {
                console.warn("Script dosyası alınamadı:", err);
            }
        }

        // Add photos
        const images = [...document.querySelectorAll("img")];
        for (let img of images) {
            const src = img.src;
            if (src.startsWith("blob:")) continue;
            try {
                const res = await fetch(src);
                const blob = await res.blob();
                const name = img.src.split("/").pop();
                zip.file(`photos/${name}`, blob);
            } catch (err) {
                console.warn("Resim yüklenemedi:", src);
            }
        }

        // Download ZIP
        zip.generateAsync({ type: "blob" }).then(content => {
            const a = document.createElement('a');
            a.href = URL.createObjectURL(content);
            a.download = 'cv.zip';
            a.click();
        });
    }
});
