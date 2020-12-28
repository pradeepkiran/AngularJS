using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ClassLibrary1.Models;
using ClassLibrary1;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Employee
{
    [Route("[controller]")]
    [ApiController]
    public class EmployeeNameController : ControllerBase
    {
        // HTTP GET: api/<ValuesController> 
        [HttpGet]
        public IEnumerable<EmployeeName> Get()
        {
            using (var context = new Context.BlogContext())
            {
                return context.EmployeeNames.ToList();
            }
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public EmployeeName Get(int id)
        {
            using (var context = new Context.BlogContext())
            {
                return context.EmployeeNames.Where(e => e.Id == id).FirstOrDefault();
            }
        }

        // POST api/<ValuesController>
        [HttpPost]
        public void Post(EmployeeName value)
        {
            using (var context = new Context.BlogContext())
            {
                value.Id = new Random().Next(1, 100000);
                context.EmployeeNames.Add(value);
                context.SaveChanges();
            }
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public void Put(int id, EmployeeName value)
        {
            using (var context = new Context.BlogContext())
            {
                //context.EmployeeNames.Remove
                var updateentity = context.EmployeeNames.Where(e => e.Id == id).FirstOrDefault();
                updateentity.Designation = value.Designation;
                updateentity.Lastname = value.Lastname;
                updateentity.Name = value.Name;
                context.EmployeeNames.Update(updateentity);
                context.SaveChanges();
            }
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            using (var context = new Context.BlogContext())
            {
                //context.EmployeeNames.Remove
                var deleteentity = context.EmployeeNames.Where(e => e.Id == id).FirstOrDefault();
                context.EmployeeNames.Remove(deleteentity);
                context.SaveChanges();
            }
        }
    }
}
