var html_loading = " <div id=\"div_loading\">\n"
        + "        <div class=\"background_loading\"></div>\n"
        + "        <div class=\"content_position\">\n"
        + "            <div class=\"frame_loading\">\n"
        + "                <div class=\"loader_by_tee\"></div>\n"
        + "            </div>\n"
        + "        </div>\n"
        + "        </div>";
function showLoading() {
//    document.getElementsByTagName('body')[0].appendChild(html_loading);
//    document.body.innerHTML += html_loading;
    $("body").prepend(html_loading);
}
function hideLoading() {
    if (document.getElementById("div_loading")) {
        document.getElementById("div_loading").remove();
    }
}