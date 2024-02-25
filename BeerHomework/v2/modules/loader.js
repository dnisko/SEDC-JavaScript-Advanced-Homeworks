export class Loader
{
    // loader logic
    static show()
    {
        document.getElementById("spinner").style.display = "block";
        // console.log(document.getElementById("spinner"));
    }

    static hide()
    {
        document.getElementById("spinner").style.display = "none";
        // console.log(document.getElementById("spinner"));
    }
}
