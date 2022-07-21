(this["webpackJsonpgithub-api"]=this["webpackJsonpgithub-api"]||[]).push([[0],{37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var r=n(1),a=n(0),s=n.n(a),o=n(20),i=n.n(o),c=n(7),l=n(23),u=n(9),d=n(14),b=n(6),m=n(24),p="### Buenos d\xedas joven Adalaber, c\xf3mo est\xe1s? Yo estoy bien!!!\n\nSoy \ud83e\udd16 **AdaBot** \ud83e\udd16 y me encargo de gestionar la cuenta de Adalab en GitHub. Me acabo de dar cuenta que tengo m\xe1s de 2800 repositorios... muchos, demasiados, imposibles de manejar para un solo bot.\n\nOs pido a las alumnas de anteriores promociones que por favor transfir\xe1is vuestros repos a tu propia usuaria de GitHub.\n\n### Si este repositorio es solo tuyo...\n\npor favor, transfierelo a tu usuaria de GitHub entrando en las [Settings](https://github.com/adalab/[repo_name]/settings), a continuaci\xf3n baja hasta **Danger Zone** y pulsa en **Transfer ownership**.\n\n### Si este repo es tuyo y de otras personas...\n\npod\xe9is hacer dos cosas:\n\n- Que una de vosotras se lo transfiera a s\xed misma y luego las compa\xf1eras hagan un fork.\n- Que todas hag\xe1is un fork y luego pod\xe9is borrar el repo original.\n\n### Si este repo es tuyo pero no te interesa...\n\nb\xf3rralo!!!\n\n### Si transfieres o haces un fork...\n\nrecuerda que para que todo funcione bien, tendr\xe1s que volver a generar GitHub Pages para que se genere una nueva direcci\xf3n.\n\n### Si no tienes permisos...\n\nes decir, si no tienes acceso a las settings escribe a Miguel del Mazo por Slack y \xe9l te dar\xe1 acceso.\n\n### Si no eres alumna...\n\no este repo no es tuyo, ignora este issue o escr\xedbe a Miguel del Mazo a trav\xe9s de Slack para avisarle de que debe arreglarme.\n\n### Si no haces nada...\n\neste repo se autodestuir\xe1 en 15 d\xedas!!! No te volver\xe9 a avisar ni te enviar\xe9 un recordatorio... no me gusta molestar :(\n\nGracias por ayudar a tener nuestro GitHub limpio y elegante.\n\n![Refuerzo positivo :)](https://media.giphy.com/media/qixJFUXq1UNLa/giphy-downsized.gif)\n\n> Este mensaje es para [assignees]\n",j={title:"AdaBot: por favor transfiere o borra este repositorio",body:p,render:function(e){var t=e.assignees.map((function(e){return"@".concat(e)})).join(" ");return p.replace("[assignees]",t).replace("[repo_name]",e.name)}},h={get:function(e){return localStorage.getItem(e)||""},set:function(e,t){localStorage.setItem(e,t)}},f=function(e){return e.map((function(e){return{id:e.id,html_url:e.html_url,name:e.name,description:e.description,updated_at:e.updated_at,created_at:e.created_at,private:e.private,archived:e.archived}}))},g=function(e){return N("repos/Adalab/".concat(e.name,"/contributors"))},O=function(e,t){e.forEach((function(e,n){e.contributors=t[n].map((function(e){return e.login})),e.contributors=e.contributors.filter((function(e){return!b.usersBlackList.includes(e)}))}))},x=function(e){e.forEach((function(e,t){e.assignees=Object(m.a)(e.contributors)}))},v=function(e){return N("repos/Adalab/".concat(e.name,"/issues"))},y=function(e,t){e.forEach((function(e,n){e.issues=t[n].map((function(e){return{title:e.title,body:e.body,user:e.user.login,assignees:e.assignees,created_at:e.created_at,html_url:e.html_url,number:e.number,state:e.state}}))}))},N=function(e,t,n,r){return fetch("".concat(b.apiBaseUrl).concat(e).concat(k(n)),{method:(t||"GET").toUpperCase(),headers:{authorization:"token ".concat(h.get("token")),"Content-Type":"application/json"},body:r?JSON.stringify(r):void 0}).then((function(e){return 200===e.status||e.status>=400&&e.status<500?e.json():[]}))},k=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=[];for(var n in e)t.push("".concat(n,"=").concat(e[n]));return t.length>0?"?"+t.join("&"):""},_={getUser:function(e){N("orgs/Adalab").then((function(t){e({public_repos:t.public_repos})}))},getRepos:function(e){var t;return N("orgs/Adalab/repos","GET",{sort:"created",direction:"asc",page:e}).then((function(e){return t=f(e)})).then((function(){return Promise.all(t.map(g))})).then((function(e){return O(t,e)})).then((function(){return x(t)})).then((function(){return Promise.all(t.map(v))})).then((function(e){return y(t,e)})).then((function(){return t}))},sendIssue:function e(t){t.contributors=t.contributors.filter((function(e){return!b.employees.includes(e)})),N("repos/Adalab/".concat(t.name,"/issues"),"POST",void 0,{title:j.title,body:j.render(t),assignees:t.contributors}).then((function(n){n.errors&&(t.contributors=t.contributors.filter((function(e){return e!==n.errors[0].value})),e(t))}))},changeContributorsPerms:function(e){e.contributors.forEach((function(t){N("repos/Adalab/".concat(e.name,"/collaborators/").concat(t),"PUT",void 0,{permission:"admin"})}))}},w=n(15),S=n(25);var C=function(e){return Object(r.jsxs)(w.a,{size:"sm",className:"ml-2 token-input-group",children:[Object(r.jsx)(w.a.Prepend,{children:Object(r.jsx)(w.a.Text,{id:"token",children:Object(r.jsx)("a",{href:"https://docs.github.com/es/github/authenticating-to-github/creating-a-personal-access-token",title:"Crear token de usuario de GitHub",target:"_blank",rel:"noreferrer",children:"GitHub token:"})})}),Object(r.jsx)(S.a,{className:"token-form-control",placeholder:"Introduce aqu\xed tu GitHub user token",value:e.token,onChange:function(t){e.setToken(t.target.value)}})]})};var A=function(){return Object(r.jsxs)("div",{className:"text-secondary sm bg-light p-4 border",children:[Object(r.jsx)("h2",{className:"h6 text-primary",children:"C\xf3mo usar el proyecto"}),Object(r.jsx)("h3",{className:"fs-m text-primary font-weight-normal",children:"Cada repo tiene dos botones:"}),Object(r.jsxs)("ul",{className:"fs-m",children:[Object(r.jsx)("li",{children:Object(r.jsxs)("p",{children:["Un bot\xf3n para crear un issue en el repo con el t\xedtulo"," ",Object(r.jsx)("strong",{children:"AdaBot: por favor transfiere o borra este repositorio"}),". Adem\xe1s se dan permisos de administraci\xf3n a todos los colaboradores del repo para que cualquiera de ellos lo pueda borrar o transferir."]})}),Object(r.jsxs)("li",{children:[Object(r.jsxs)("p",{children:["Un bot\xf3n para borrar el repo, que solo aparece si alguien ha creado un issue con el t\xedtulo ",Object(r.jsx)("strong",{children:"AdaBot: por favor transfiere o borra este repositorio"})," y han pasado m\xe1s de 15 d\xedas de la creaci\xf3n del issue."]}),Object(r.jsx)("p",{children:"Esta es una medida de seguridad para poder dar a las alumnas 15 d\xedas para que transfieran el repo, antes de borr\xe1rselo."})]})]}),Object(r.jsx)("h3",{className:"fs-m text-primary font-weight-normal",children:"Funci\xf3n deshacer (Ctrl+Z):"}),Object(r.jsx)("p",{className:"fs-m",children:"Todas las llamadas al API de GitHub se hacen con 10 segundos de retraso. De esta forma si te equivocas al enviar un issue o al borrar un repo tienes 10 segundos para cerrar la p\xe1gina. De esta forma la petici\xf3n al API no se enviar\xe1."}),Object(r.jsx)("h3",{className:"fs-m text-primary font-weight-normal",children:"Colores de los repos:"}),Object(r.jsx)("p",{className:"fs-m",children:"Con los repos de color amarillo hay que tener cuidado, son repos cuyos colaboradores son empleados de Adalab o son repos privados."})]})},q=n(21);var z=function(e){return e.loading?Object(r.jsx)(q.a,{animation:"grow",size:"sm",variant:"primary",className:"d-inline-block",children:Object(r.jsx)("span",{className:"sr-only",children:"Loading..."})}):Object(r.jsx)("span",{})},I=n(19);var P=function(e){return Object(r.jsx)(I.a,{size:"sm",className:"flex-wrap mt-2",children:function(){for(var t=e.totalItems/e.pageSize,n=[],a=0;a<=t;a+=1)n.push({page:a,number:a+1});return n.map((function(t){return Object(r.jsx)(I.a.Item,{className:"mb-1",active:parseInt(e.page)===t.page,onClick:function(){return e.handlePage(t.page)},children:t.number},t.page)}))}()})},T=n(13),E=n(22),G=n(17),B=n(18),D={format:function(e){var t=(e=new Date(e)).getDate(e),n=t<10?"0"+t:t,r=e.getMonth(e)+1,a=r<10?"0"+r:r,s=e.getFullYear(e);return"".concat(n,"/").concat(a,"/").concat(s)}};var U=function(){return Object(r.jsx)("thead",{className:"fs-m bg-primary text-white",children:Object(r.jsxs)("tr",{children:[Object(r.jsx)("th",{className:"font-weight-normal",children:"#"}),Object(r.jsx)("th",{className:"font-weight-normal",children:"Acciones"}),Object(r.jsx)("th",{className:"font-weight-normal",children:"Repo"}),Object(r.jsx)("th",{className:"font-weight-normal",children:"Fecha"}),Object(r.jsx)("th",{className:"font-weight-normal",children:"Contribuidores"}),Object(r.jsx)("th",{className:"font-weight-normal",children:"Issues"})]})})};var H=function(e){var t=function(e){return Object(r.jsx)("td",{children:Object(r.jsx)("span",{className:"fs-m",children:e})})},n=function(e,t){return Object(r.jsxs)("td",{children:[a(e),s(e)]})},a=function(t){return!!t.issues.find((function(e){return e.title===j.title}))||0===t.contributors.length?null:Object(r.jsx)(G.a,{size:"sm",title:"Crear issue en este repo",variant:"primary",onClick:function(){return e.sendIssue(t)},children:Object(r.jsx)(B.a,{})})},s=function(t){var n=t.issues.find((function(e){return e.title===j.title})),a=n?new Date(n.created_at):new Date;return(new Date).getTime()-a.getTime()>b.deleteButtonTimeAgo?Object(r.jsx)(G.a,{size:"sm",title:"Crear issue en este repo",variant:"danger",onClick:function(){return e.sendIssue(t)},children:Object(r.jsx)(B.b,{})}):null},o=function(e){var t=e.archived?Object(r.jsx)(T.a,{variant:"warning",className:"ml-1",children:"archivado"}):null,n=e.private?Object(r.jsx)(T.a,{variant:"danger",className:"ml-1",children:"privado"}):null;return Object(r.jsxs)("td",{className:"fs-m",children:[Object(r.jsx)("a",{href:e.html_url,target:"_blank",rel:"noreferrer",className:"font-weight-bold",children:e.name}),n,t,Object(r.jsx)("span",{className:"fs-s text-secondary d-block",children:e.description})]})},i=function(e){return Object(r.jsxs)("td",{className:"fs-s",children:[Object(r.jsx)("span",{className:"d-block",children:D.format(e.created_at)}),Object(r.jsx)("span",{children:D.format(e.updated_at)})]})},c=function(e){var t=e.contributors.map((function(e){var t=b.employees.includes(e)?"danger":"primary";return Object(r.jsx)(T.a,{variant:t,className:"ml-1 fs-s",children:Object(r.jsx)("a",{href:"//github.com/".concat(e),className:"text-white",target:"_blank",rel:"noreferrer",children:e})},e)}));return Object(r.jsx)("td",{children:t})},l=function(e){var t=e.issues.map((function(e,t){return Object(r.jsxs)("li",{className:"open"===e.state?"":"text-danger",children:[Object(r.jsxs)("span",{className:"font-weight-bold",children:["#",e.number," ",e.user,":"]}),Object(r.jsxs)("span",{children:[" ",D.format(e.created_at)]}),Object(r.jsx)("a",{className:"d-block text-truncate pb-1",href:e.html_url,target:"_blank",title:e.body,rel:"noreferrer",children:e.title})]},t)}));return Object(r.jsx)("td",{className:"fs-s",children:Object(r.jsx)("ul",{className:"m-0 p-0 list-unstyled issues__list",children:t})})};return Object(r.jsx)("div",{className:"border bg-white",children:Object(r.jsxs)(E.a,{hover:!0,size:"sm",children:[Object(r.jsx)(U,{}),Object(r.jsx)("tbody",{children:e.repos.map((function(e,a){return Object(r.jsxs)("tr",{children:[t(a),n(e),o(e,a),i(e),c(e),l(e)]},e.id)}))})]})})};var M=function(e){return Object(r.jsxs)("h1",{className:"h3 text-primary font-weight-normal",children:[Object(r.jsx)("span",{children:"Gestor de repositorios de Adalab:"}),Object(r.jsxs)("span",{className:"text-muted",children:[" ",e.reposCounter," repos"]})]})};var J=function(){var e=Object(a.useState)(h.get("currentPage")||0),t=Object(c.a)(e,2),n=t[0],s=t[1],o=Object(a.useState)(!1),i=Object(c.a)(o,2),m=i[0],p=i[1],j=Object(a.useState)([]),f=Object(c.a)(j,2),g=f[0],O=f[1],x=Object(a.useState)(h.get("token")),v=Object(c.a)(x,2),y=v[0],N=v[1],k=Object(a.useState)({}),w=Object(c.a)(k,2),S=w[0],q=w[1];return Object(a.useEffect)((function(){y&&_.getUser(q)}),[y]),Object(a.useEffect)((function(){h.set("token",y)}),[y]),Object(a.useEffect)((function(){h.set("currentPage",n)}),[n]),Object(a.useEffect)((function(){y&&(p(!0),O([]),_.getRepos(n).then((function(e){O(e),p(!1)})))}),[y,n]),Object(r.jsxs)(l.a,{fluid:!0,children:[Object(r.jsxs)(d.a,{className:"mt-2",children:[Object(r.jsx)(u.a,{md:"8",children:Object(r.jsx)(M,{reposCounter:S.public_repos})}),Object(r.jsxs)(u.a,{md:"4",className:"d-flex align-items-center justify-content-end mb-2",children:[Object(r.jsx)(z,{loading:m}),Object(r.jsx)(C,{token:y,setToken:N})]})]}),Object(r.jsx)(d.a,{children:Object(r.jsxs)(u.a,{children:[Object(r.jsx)(H,{repos:g,sendIssue:function(e){var t=g.filter((function(t){return t.name!==e.name}));O(t),setTimeout((function(){_.sendIssue(e),_.changeContributorsPerms(e)}),b.apiCallsDelay)}}),Object(r.jsx)(P,{page:n,pageSize:b.apiPageSize,totalItems:S.public_repos,handlePage:s})]})}),Object(r.jsx)(d.a,{children:Object(r.jsx)(u.a,{children:Object(r.jsx)(A,{})})})]})};n(36),n(37);i.a.render(Object(r.jsx)(s.a.StrictMode,{children:Object(r.jsx)(J,{})}),document.getElementById("root"))},6:function(e){e.exports=JSON.parse('{"apiBaseUrl":"https://api.github.com/","apiPageSize":30,"apiCallsDelay":10000,"deleteButtonTimeAgo":1296000000,"employees":["admin","guerrero","gootyfer","oneeyedman","nasivuela","migueldelmazo","pixelmary","dayanare","igarridomorillas","gponsu","adalab-tech","gorkamolero"],"usersBlackList":["dependabot[bot]"]}')}},[[38,1,2]]]);
//# sourceMappingURL=main.ee91febc.chunk.js.map