var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ActionFormData } from '@minecraft/server-ui';
import { ItemUseAfterEvent, world } from "@minecraft/server";
import { methodEventSub } from "../lib/eventHelper";

const BACK_BUTTON_ICON = "textures/ui/recap_glyph_color_2x";

function OiledKnifeForm(player) {
  const form = new ActionFormData()
    .title({ "rawtext": [{ "text": "item.mooncake_delight:oiled_knife" }] })
    .body({
      "rawtext": [
        { "translate": "item.mooncake_delight.oiled_knife.tooltip.1" },
        { "text": "\n" },
        { "translate": "item.mooncake_delight.oiled_knife.tooltip.2" },
      ]
    })
    .button({ "rawtext": [{ "text": "farmersdelight.book.back" }] }, BACK_BUTTON_ICON);

  form.show(player).then((response) => {
    if (response.selection === 0) {
      mainForm(player);
    }
  });
}

function IngredientsForm(player) {
  const form = new ActionFormData()
    .title({ "rawtext": [{ "text": "mooncake_delight.book.ingredients" }] })
    .button({ "rawtext": [{ "text": "item.mooncake_delight:flour" }] }, "textures/items/mooncake_delight/flour")
    .button({ "rawtext": [{ "text": "item.mooncake_delight:lotus_seed" }] }, "textures/items/mooncake_delight/lotus_seed")
    .button({ "rawtext": [{ "text": "item.mooncake_delight:truffle" }] }, "textures/items/mooncake_delight/truffle")
    .button({ "rawtext": [{ "text": "item.mooncake_delight:tallow" }] }, "textures/items/mooncake_delight/tallow")
    .button({ "rawtext": [{ "text": "item.mooncake_delight.sesame" }] }, "textures/items/mooncake_delight/white_sesame")
    .button({ "rawtext": [{ "text": "farmersdelight.book.back" }] }, BACK_BUTTON_ICON);

  form.show(player).then((response) => {
    switch (response.selection) {
      case 0:
        FlourForm(player);
        break;
      case 1:
        LotusSeedForm(player);
        break;
      case 2:
        TruffleForm(player);
        break;
      case 3:
        TallowForm(player);
        break;
      case 4:
        SesameForm(player);
        break;
      case 5:
        mainForm(player);
        break;
    }
  });
}

function FlourForm(player) {
  const form = new ActionFormData()
    .title({ "rawtext": [{ "text": "item.mooncake_delight:flour" }] })
    .body({
      "rawtext": [
        { "translate": "mooncake_delight.book.flour.description" },
      ]
    })
    .button({ "rawtext": [{ "text": "farmersdelight.book.back" }] }, BACK_BUTTON_ICON);

  form.show(player).then((response) => {
    if (response.selection === 0) {
      IngredientsForm(player);
    }
  });
}

function LotusSeedForm(player) {
  const form = new ActionFormData()
    .title({ "rawtext": [{ "text": "item.mooncake_delight:lotus_seed" }] })
    .body({
      "rawtext": [
        { "translate": "mooncake_delight.book.lotus_seed.description" }
      ]
    })
    .button({ "rawtext": [{ "text": "farmersdelight.book.back" }] }, BACK_BUTTON_ICON);

  form.show(player).then((response) => {
    if (response.selection === 0) {
      IngredientsForm(player);
    }
  });
}

function TruffleForm(player) {
  const form = new ActionFormData()
    .title({ "rawtext": [{ "text": "item.mooncake_delight:truffle" }] })
    .body({
      "rawtext": [
        { "translate": "mooncake_delight.book.truffle.description" }
      ]
    })
    .button({ "rawtext": [{ "text": "farmersdelight.book.back" }] }, BACK_BUTTON_ICON);

  form.show(player).then((response) => {
    if (response.selection === 0) {
      IngredientsForm(player);
    }
  });
}

function TallowForm(player) {
  const form = new ActionFormData()
    .title({ "rawtext": [{ "text": "item.mooncake_delight:tallow" }] })
    .body({
      "rawtext": [
        { "translate": "mooncake_delight.book.tallow.description" }
      ]
    })
    .button({ "rawtext": [{ "text": "farmersdelight.book.back" }] }, BACK_BUTTON_ICON);

  form.show(player).then((response) => {
    if (response.selection === 0) {
      IngredientsForm(player);
    }
  });
}

function SesameForm(player) {
  const form = new ActionFormData()
    .title({ "rawtext": [{ "text": "item.mooncake_delight.sesame" }] })
    .body({
      "rawtext": [
        { "translate": "mooncake_delight.book.sesame.description" }
      ]
    })
    .button({ "rawtext": [{ "text": "farmersdelight.book.back" }] }, BACK_BUTTON_ICON);

  form.show(player).then((response) => {
    if (response.selection === 0) {
      IngredientsForm(player);
    }
  });
}

function thanksForm(player) {
  const form = new ActionFormData()
    .title({ "rawtext": [{ "text": "farmersdelight.book.thanks" }] })
    .body({
      "rawtext": [
        { "translate": "mooncake_delight.book.thanks.description" }
      ]
    })
    .button({ "rawtext": [{ "text": "farmersdelight.book.back" }] }, BACK_BUTTON_ICON);

  form.show(player).then((response) => {
    if (response.selection === 0) {
      mainForm(player);
    }
  });
}

function mainForm(player) {
  const form = new ActionFormData()
    .title({ "rawtext": [{ "text": "mooncake_delight.book.pack" }] })
    .button({ "rawtext": [{ "text": "mooncake_delight.book.ingredients" }] }, "textures/items/mooncake_delight/flour")
    .button({ "rawtext": [{ "text": "item.mooncake_delight:oiled_knife" }] }, "textures/items/mooncake_delight/oiled_knife")
    .button({ "rawtext": [{ "text": "farmersdelight.book.thanks" }] }, "textures/items/nether_star");

  form.show(player).then((response) => {
    switch (response.selection) {
      case 0:
        IngredientsForm(player);
        break;
      case 1:
        OiledKnifeForm(player);
        break;
      case 2:
        thanksForm(player);
        break;
    }
  });
}

export class BookRegister {
  itemUse(args) {
    const player = args.source;
    const itemStack = args.itemStack;
    if (itemStack?.typeId === "mooncake_delight:book_mooncake_delight") {
      mainForm(player);
    }
  }
}

__decorate([
  methodEventSub(world.afterEvents.itemUse),
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [ItemUseAfterEvent]),
  __metadata("design:returntype", void 0)
], BookRegister.prototype, "itemUse", null);