using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryTreesController : ControllerBase
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        public CountryTreesController(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public ActionResult<IEnumerable<CountryModel>> Get()
        {
            List<CountryModel> model = new List<CountryModel>();

            string webRootPath = _hostingEnvironment.WebRootPath;
            var jsonData = System.IO.File.ReadAllText(webRootPath + "/static/dummy_data.json");

            List<CountryModel> items;
            items = JsonConvert.DeserializeObject<List<CountryModel>>(jsonData);

            for (int i = 0; i < items.Count; i++)
            {
                model.Add(new CountryModel()
                {
                    Name = items[i].Name,
                    TreeCount = items[i].TreeCount
                });
            }

            return model;
        }
    }
}
