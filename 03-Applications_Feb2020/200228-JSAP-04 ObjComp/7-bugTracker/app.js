function solve() {
    let module = (() => {
        const reports = [];
        let id = 0;
        const selector = document.getElementById('content');

        let report = function (author, description, reproducible, severity) {
            let status = 'Open';

            let report = {
                id,
                author,
                description,
                reproducible,
                severity,
                status
            };

            reports.push(report);
            id++;

           output();
        };

        let setStatus = function (id, newStatus) {
            let report = reports.find(r => r.id === id);
            report.status = newStatus;

            output();
        };

        let remove = function (id) {
            let reportIndex = reports.findIndex(r => r.id === id);

            reports.splice(reportIndex, 1);
            output();
        };

        let sort = function (method = 'id') {
            if (method === 'author') {
                reports.sort((a, b) => a.author.localeCompare(b.author));
            } else if (method == 'severity') {
                reports.sort((a, b) => a.severity - b.severity);
            } else {
                reports.sort((a, b) => a.id - b.id);
            }

            // This is not valid for judge despite being accurate !!!
            // if (method === 'author') {
            //     reports.sort((a, b) => a.author.localeCompare(b.author));
            // } else {
            //     reports.sort((a, b) => a[method] - b[method]);
            // } 

           output();
        };

        let output = function () {
            selector.innerHTML = "";
            reports.forEach(r => selector.appendChild(update(r)));
        };

        let update = function (rep) {
            let divReport = createElement('div', `report_${rep.id}`, 'report');

            let divBody = createElement('div', null, 'body');
            let pDescription = createElement('p', null, null, rep.description);
            divBody.appendChild(pDescription);

            let divTitle = createElement('div', null, 'title');
            let spanAuthor = createElement('span', null, 'author', `Submitted by: ${rep.author}`);
            let spanStatus = createElement('span', null, 'status', `${rep.status} | ${rep.severity}`);
            divTitle.appendChild(spanAuthor);
            divTitle.appendChild(spanStatus);

            divReport.appendChild(divBody);
            divReport.appendChild(divTitle);

            return divReport;
        }

        let createElement = function (element, idValue, className, textValue) {
            let elem = document.createElement(element);

            if (idValue) {
                elem.setAttribute('id', idValue);
            }

            if (className) {
                elem.className = className;
            }

            if (textValue) {
                elem.textContent = textValue;
            }

            return elem;
        }


        return { report, setStatus, remove, sort, output }
    })();

    return module;
}