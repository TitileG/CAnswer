using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using INF354API.Models;

namespace INF354API.Controllers
{
    public class ColloboratorController : ApiController
    {
        private S354_ProjectEntities1 db = new S354_ProjectEntities1();

        // GET: api/Colloborator
        public IQueryable<Colloborator> GetColloborators()
        {
            return db.Colloborators;
        }

        // GET: api/Colloborator/5
        [ResponseType(typeof(Colloborator))]
        public IHttpActionResult GetColloborator(int id)
        {
            Colloborator colloborator = db.Colloborators.Find(id);
            if (colloborator == null)
            {
                return NotFound();
            }

            return Ok(colloborator);
        }

        // PUT: api/Colloborator/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutColloborator(int id, Colloborator colloborator)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != colloborator.ID)
            {
                return BadRequest();
            }

            db.Entry(colloborator).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ColloboratorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Colloborator
        [ResponseType(typeof(Colloborator))]
        public IHttpActionResult PostColloborator(Colloborator colloborator)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Colloborators.Add(colloborator);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = colloborator.ID }, colloborator);
        }

        // DELETE: api/Colloborator/5
        [ResponseType(typeof(Colloborator))]
        public IHttpActionResult DeleteColloborator(int id)
        {
            Colloborator colloborator = db.Colloborators.Find(id);
            if (colloborator == null)
            {
                return NotFound();
            }

            db.Colloborators.Remove(colloborator);
            db.SaveChanges();

            return Ok(colloborator);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ColloboratorExists(int id)
        {
            return db.Colloborators.Count(e => e.ID == id) > 0;
        }
    }
}